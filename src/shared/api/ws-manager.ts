import type { CommentDTO } from '@/shared/api/generated/mecenateTestAPI.schemas';

export type WSEventType = 'ping' | 'like_updated' | 'comment_added';

export type WSEvent =
  | { type: 'ping' }
  | { type: 'like_updated'; postId: string; likesCount: number }
  | { type: 'comment_added'; postId: string; comment: CommentDTO };

const WS_RECONNECT_BASE_DELAY = 500; // 500ms начальная задержка
const WS_RECONNECT_EXPONENTIAL_BASE = 2;
const WS_RECONNECT_MAX_DELAY = 10_000; // 10 секунд максимум
const WS_RECONNECT_JITTER = 200; // 200ms jitter для предотвращения синхронных попыток

const getWsReconnectDelay = (attempt: number) =>
  Math.min(
    WS_RECONNECT_BASE_DELAY * WS_RECONNECT_EXPONENTIAL_BASE ** attempt,
    WS_RECONNECT_MAX_DELAY,
  ) +
  Math.random() * WS_RECONNECT_JITTER;

export class WSManager {
  private ws: WebSocket | null = null;
  private listeners = new Map<WSEventType, Set<(e: WSEvent) => void>>();
  private reconnectAttempts = 0;
  private url: string;
  private token: string;
  private watchdogTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(url: string, token: string) {
    this.url = url;
    this.token = token;
  }

  connect() {
    if (this.ws?.readyState === WebSocket.OPEN) return;
    this.ws = new WebSocket(`${this.url}?token=${this.token}`);
    this.ws.onmessage = (e) => this.routeMessage(e);
    this.ws.onclose = () => this.reconnect();
    this.ws.onerror = () => this.ws?.close();
    this.startWatchdog();
  }

  on(eventType: WSEventType, handler: (e: WSEvent) => void) {
    if (!this.listeners.has(eventType)) this.listeners.set(eventType, new Set());
    this.listeners.get(eventType)!.add(handler);
  }

  // Врядли понадобится, но для симетричности пусть лучше будет
  off(eventType: WSEventType, handler: (e: WSEvent) => void) {
    this.listeners.get(eventType)?.delete(handler);
  }

  private routeMessage(e: MessageEvent) {
    try {
      const msg = JSON.parse(e.data);
      if (msg.type === 'ping') {
        this.resetWatchdog();
      }
      this.listeners.get(msg.type)?.forEach((l) => l(msg));
    } catch (_) {
      console.error('WS message parse error');
    }
  }

  private reconnect() {
    const delay = getWsReconnectDelay(this.reconnectAttempts);
    this.reconnectAttempts++;
    setTimeout(() => this.connect(), delay);
  }

  private startWatchdog() {
    this.clearWatchdog();
    this.watchdogTimer = setTimeout(() => {
      this.ws?.close();
      this.reconnect();
    }, 60_000);
  }

  private resetWatchdog() {
    this.clearWatchdog();
    this.startWatchdog();
  }

  private clearWatchdog() {
    if (this.watchdogTimer) {
      clearTimeout(this.watchdogTimer);
      this.watchdogTimer = null;
    }
  }

  disconnect() {
    this.clearWatchdog();
    this.ws?.close();
    this.ws = null;
  }
}

export const wsManager = new WSManager(
  process.env.EXPO_PUBLIC_WS_URL!,
  process.env.EXPO_PUBLIC_API_TOKEN!,
);
