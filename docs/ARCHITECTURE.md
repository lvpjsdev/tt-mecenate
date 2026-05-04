# Architecture

## FSD Layers

```
src/
├── app/          # Роуты и layout (Expo Router)
├── core/         # Глобальное состояние (network, reactions)
├── entities/     # Бизнес-сущности (Post, Comment)
├── features/     # Пользовательские сценарии
└── shared/       # Переиспользуемый код
```

Слои зависят только от нижележащих (app → features → entities → shared).

---

## WebSocket Architecture

Три слоя:

### 1. WSManager (`shared/api/ws-manager.ts`)
Транспортный слой:
- Подключение/реконнект (exponential backoff 500мс → 10с)
- Watchdog (60с на ping)
- Роутинг сообщений по типу

### 2. Hooks (`features/ws-realtime-updates`)
Бизнес-логика:
- `useWsLikeUpdated` — обновляет кэш ленты и детали
- `useWsCommentAdded` — добавляет комментарий в кэш

### 3. App Mount (`app/_layout.tsx`)
Инициализация:
```tsx
useEffect(() => wsManager.connect(), [])
```

---

## Data Fetching

### React Query

| Параметр | Значение | Зачем |
|----------|----------|-------|
| `staleTime` | 5 мин | WS обновляет кэш точечно |
| `retry` | 3 | Мобильные сети нестабильны |
| `retryDelay` | 1s → 30s + jitter | Не штормим сервер |

### Optimistic Updates (только лайки)

**Зачем:** мгновенная реакция UI на нажатие.

**Как работает:**
1. `onMutate` — сохраняем снапшот кэша, обновляем UI
2. HTTP запрос уходит параллельно
3. `onSuccess` — сервер подтверждает, пишем точные значения
4. WS `like_updated` — синхронизирует с другими клиентами
5. `onError` — откатываем кэш к снапшоту

**Почему не для комментов:** коммент — необратимая операция, нужен серверный ID.

---

## State Management

### MobX

`networkStore` отслеживает сеть через `NetInfo`.

```ts
reaction(
  () => networkStore.isOnline,
  online => onlineManager.setOnline(online)
)
```

React Query автоматически ставит запросы на паузу в offline.

---

## Environment Validation

Zod-схема валидирует переменные при старте. Приложение падает с понятной ошибкой если чего не хватает.

```ts
const envSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string().url(),
  EXPO_PUBLIC_WS_URL: z.string().regex(/^wss?:\/\//),
  EXPO_PUBLIC_API_TOKEN: z.string().min(1),
})
```