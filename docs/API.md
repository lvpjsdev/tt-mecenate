# API Documentation

База: `https://k8s.mectest.ru/test-app`

## Authentication

Все запросы используют Bearer-токен из `EXPO_PUBLIC_API_TOKEN`.

```
Authorization: Bearer <uuid>
```

---

## Posts API

### GET /posts

Список постов с курсорной пагинацией.

**Query Parameters:**
| Param | Type | Default | Описание |
|-------|------|---------|----------|
| `cursor` | string | — | Курсор для следующей страницы |
| `limit` | number | 10 | Количество постов |
| `tier` | `free` \| `paid` | — | Фильтр по типу |
| `simulate_error` | boolean | false | Тестовая ошибка |

**Response:**
```ts
{
  ok: true,
  data: {
    posts: PostDTO[],
    nextCursor: string | null,
    hasMore: boolean
  }
}
```

---

### GET /posts/:id

Детали поста.

**Path Parameters:**
| Param | Type | Описание |
|-------|------|----------|
| `id` | string | UUID поста |

**Response:**
```ts
{
  ok: true,
  data: {
    post: PostDetailDTO
  }
}
```

---

### POST /posts/:id/like

Переключить лайк (toggle).

**Path Parameters:**
| Param | Type | Описание |
|-------|------|----------|
| `id` | string | UUID поста |

**Response:**
```ts
{
  ok: true,
  data: {
    isLiked: boolean,
    likesCount: number
  }
}
```

---

### GET /posts/:id/comments

Комментарии с курсорной пагинацией.

**Query Parameters:**
| Param | Type | Default | Описание |
|-------|------|---------|----------|
| `cursor` | string | — | Курсор |
| `limit` | number | 10 | Количество комментариев |

**Response:**
```ts
{
  ok: true,
  data: {
    comments: CommentDTO[],
    nextCursor: string | null,
    hasMore: boolean
  }
}
```

---

### POST /posts/:id/comments

Отправить комментарий.

**Body:**
```json
{
  "text": "string (1-500 chars)"
}
```

**Response:**
```ts
{
  ok: true,
  data: {
    comment: CommentDTO
  }
}
```

---

## WebSocket

URL: `ws://k8s.mectest.ru/test-app/ws?token=<uuid>`

### События

| Событие | Payload | Описание |
|---------|---------|----------|
| `ping` | `{}` | Keep-alive |
| `like_updated` | `{ postId, likesCount }` | Обновление лайков |
| `comment_added` | `{ postId, comment }` | Новый комментарий |

---

## Types

```ts
interface PostDTO {
  id: string
  author: {
    id: string
    username: string
    displayName: string
    avatarUrl?: string
    isVerified?: boolean
  }
  title?: string
  body?: string
  preview?: string
  coverUrl?: string
  likesCount: number
  commentsCount: number
  isLiked?: boolean
  tier: 'free' | 'paid'
  createdAt: string
}

interface CommentDTO {
  id: string
  postId: string
  author: PostDTO['author']
  text: string
  createdAt: string
}
```