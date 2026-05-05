import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { createServer, ServerResponse } from 'http';
import type { IncomingMessage } from 'http';
import { WebSocket, WebSocketServer } from 'ws';
import {
  addComment,
  authors,
  getCommentsByPostId,
  getPostById,
  posts,
  toggleLike,
  validateUUID,
  wsClients,
} from './store';

const app = new Hono();

// Middleware для проверки UUID токена
const authMiddleware = async (c: any, next: any) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json(
      {
        ok: false,
        error: { code: 'UNAUTHORIZED', message: 'Missing or invalid UUID token' },
      },
      401,
    );
  }

  const token = authHeader.split(' ')[1];
  if (!validateUUID(token)) {
    return c.json(
      {
        ok: false,
        error: { code: 'UNAUTHORIZED', message: 'Invalid UUID token' },
      },
      401,
    );
  }

  c.set('userId', token);
  await next();
};

// GET /posts - список постов с пагинацией и фильтрацией
app.get('/test-app/posts', authMiddleware, (c) => {
  const limit = Math.min(parseInt(c.req.query('limit') || '10'), 20);
  const cursor = c.req.query('cursor');
  const tier = c.req.query('tier') as 'free' | 'paid' | undefined;
  const simulateError = c.req.query('simulate_error') === 'true';

  if (simulateError) {
    return c.json(
      {
        ok: false,
        error: { code: 'INTERNAL_ERROR', message: 'Internal server error (simulated)' },
      },
      500,
    );
  }

  let filteredPosts = [...posts];

  if (tier) {
    filteredPosts = filteredPosts.filter((p: any) => p.tier === tier);
  }

  if (cursor) {
    const cursorIndex = filteredPosts.findIndex((p: any) => p.id === cursor);
    if (cursorIndex >= 0) {
      filteredPosts = filteredPosts.slice(cursorIndex + 1);
    }
  }

  const hasMore = filteredPosts.length > limit;
  const paginatedPosts = filteredPosts.slice(0, limit);
  const nextCursor = hasMore
    ? paginatedPosts[paginatedPosts.length - 1]?.id || null
    : null;

  return c.json({
    ok: true,
    data: {
      posts: paginatedPosts,
      nextCursor,
      hasMore,
    },
  });
});

// GET /posts/:id - детали поста
app.get('/test-app/posts/:id', authMiddleware, (c) => {
  const postId = c.req.param('id');
  const post = getPostById(postId);

  if (!post) {
    return c.json(
      {
        ok: false,
        error: { code: 'NOT_FOUND', message: 'Post not found' },
      },
      404,
    );
  }

  return c.json({ ok: true, data: { post } });
});

// POST /posts/:id/like - лайк/анлайк
app.post('/test-app/posts/:id/like', authMiddleware, (c) => {
  const postId = c.req.param('id');
  const _userId = c.get('userId');

  const post = getPostById(postId);
  if (!post) {
    return c.json(
      {
        ok: false,
        error: { code: 'NOT_FOUND', message: 'Post not found' },
      },
      404,
    );
  }

  const result = toggleLike(postId, _userId);

  // Задержка 1-3 секунды перед отправкой WS события
  const delay = 1000 + Math.random() * 2000;
  setTimeout(() => {
    const message = JSON.stringify({
      type: 'like_updated',
      postId,
      likesCount: result.likesCount,
    });
    wsClients.forEach((ws: WebSocket) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(message);
      }
    });
  }, delay);

  return c.json({ ok: true, data: result });
});

// GET /posts/:id/comments - комментарии к посту
app.get('/test-app/posts/:id/comments', authMiddleware, (c) => {
  const postId = c.req.param('id');
  const limit = parseInt(c.req.query('limit') || '20');
  const cursor = c.req.query('cursor');

  const post = getPostById(postId);
  if (!post) {
    return c.json(
      {
        ok: false,
        error: { code: 'NOT_FOUND', message: 'Post not found' },
      },
      404,
    );
  }

  const { comments, nextCursor, hasMore } = getCommentsByPostId(
    postId,
    limit,
    cursor,
  );

  return c.json({
    ok: true,
    data: { comments, nextCursor, hasMore },
  });
});

// POST /posts/:id/comments - добавление комментария
app.post('/test-app/posts/:id/comments', authMiddleware, async (c) => {
  const postId = c.req.param('id');
  const _userId = c.get('userId');
  const body = await c.req.json().catch(() => null);

  if (!body || !body.text || typeof body.text !== 'string') {
    return c.json(
      {
        ok: false,
        error: { code: 'VALIDATION_ERROR', message: 'Text is required' },
      },
      400,
    );
  }

  const text = body.text.trim();
  if (text.length < 1 || text.length > 500) {
    return c.json(
      {
        ok: false,
        error: { code: 'VALIDATION_ERROR', message: 'Text must be 1-500 characters' },
      },
      400,
    );
  }

  const post = getPostById(postId);
  if (!post) {
    return c.json(
      {
        ok: false,
        error: { code: 'NOT_FOUND', message: 'Post not found' },
      },
      404,
    );
  }

  const comment = addComment(postId, text, 'author_1');
  const newComment = {
    id: comment.id,
    postId: comment.postId,
    author: comment.author,
    text: comment.text,
    createdAt: comment.createdAt,
  };

  // Отправляем WS событие
  const message = JSON.stringify({
    type: 'comment_added',
    postId,
    comment: newComment,
  });
  wsClients.forEach((ws: WebSocket) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(message);
    }
  });

  return c.json({ ok: true, data: { comment: newComment } }, 201);
});

// Настройка сервера
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Запускаем Hono сервер и получаем доступ к HTTP серверу
const server = serve({
  fetch: app.fetch,
  port,
}, (info) => {
  console.log(`Mock server running on http://localhost:${info.port}`);
  console.log(`REST API: http://localhost:${info.port}/test-app/posts`);
  console.log(
    `WS endpoint: ws://localhost:${info.port}/test-app/ws?token=YOUR_UUID`,
  );
});

// Настройка WebSocket сервера на том же HTTP сервере
const wss = new WebSocketServer({ noServer: true });

// Пинг каждые 30 секунд
const pingInterval = setInterval(() => {
  const pingMessage = JSON.stringify({ type: 'ping' });
  wsClients.forEach((ws: WebSocket) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(pingMessage);
    }
  });
}, 30000);

// Обработка WebSocket подключений
server.on('upgrade', (request: IncomingMessage, socket: any, head: Buffer) => {
  const url = new URL(request.url || '', `http://${request.headers.host}`);
  const pathname = url.pathname;

  if (pathname === '/test-app/ws' || pathname === '/ws') {
    const token = url.searchParams.get('token');

    if (!token || !validateUUID(token)) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }

    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request, token);
    });
  } else {
    socket.destroy();
  }
});

wss.on('connection', (ws: WebSocket, request: IncomingMessage, token: string) => {
  wsClients.add(ws);
  console.log(`WS connected: ${token}, total clients: ${wsClients.size}`);

  ws.on('message', (_data: Buffer) => {
    // Игнорируем входящие сообщения от клиента (по спецификации)
  });

  ws.on('close', () => {
    wsClients.delete(ws);
    console.log(`WS disconnected: ${token}, total clients: ${wsClients.size}`);
  });

  ws.on('error', (err: Error) => {
    console.error('WS error:', err);
    wsClients.delete(ws);
  });
});

// Очистка при завершении
process.on('SIGINT', () => {
  clearInterval(pingInterval);
  wss.close();
  server.close();
  process.exit(0);
});
