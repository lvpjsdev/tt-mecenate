# Mecenate — Feed Screen

Тестовое задание: экран ленты публикаций для платформы Mecenate (аналог Patreon/Boosty).

Платформа: iOS + Android (React Native + Expo)

---

## Быстрый старт

### Требования

- Node.js >= 20.18.1 (требование `undici`, транзитивной зависимости Expo Router)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Для iOS: macOS + Xcode
- Для Android: Android Studio + эмулятор или физическое устройство

### Установка

```bash
npm install
```

### Переменные окружения

Скопируйте `.env.example` в `.env` и заполните токен:

```bash
cp .env.example .env
```

| Переменная              | Описание                                                                 |
|-------------------------|--------------------------------------------------------------------------|
| `EXPO_PUBLIC_API_URL`   | Базовый URL API (`https://k8s.mectest.ru/test-app`)                      |
| `EXPO_PUBLIC_WS_URL`    | URL WebSocket-сервера (`ws://k8s.mectest.ru/test-app/ws`)                |
| `EXPO_PUBLIC_API_TOKEN` | UUID пользователя, используется как Bearer-токен для HTTP и как `?token=` параметр для WS. Любой валидный UUID, например `550e8400-e29b-41d4-a716-446655440000` |

### Запуск

```bash
# Expo Go (быстрый старт без нативной сборки)
npm start

# iOS (нативная сборка)
npm run ios

# Android (нативная сборка)
npm run android
```

### Дополнительные команды

```bash
npm run lint          # проверка кода (Biome)
npm run lint:fix      # автоисправление
npm run format        # форматирование
npm run typecheck     # проверка типов TypeScript
npm run generate-api  # генерация API-клиента из Swagger (Orval)
```

Orval читает схему из локального файла `openapi.json` (копия [удалённого Swagger](https://k8s.mectest.ru/test-app/openapi.json)) и генерирует типизированные функции в `src/shared/api/generated/`.

---

## Задача

Разработать экран ленты публикаций для платформы Mecenate — сервиса поддержки авторов.
Пользователь открывает приложение и видит список постов от авторов, на которых подписан.

---

## Экран Feed (лента)

### Список постов: аватар автора, имя, превью текста, обложка поста, счётчик лайков и комментариев

Карточка поста собирается из трёх подкомпонентов:

| Элемент | Файл |
|---|---|
| Корневой компонент карточки | `src/entities/post/ui/PostCard/PostCard.tsx` |
| Шапка (аватар + имя автора) | `src/entities/post/ui/PostCard/PostCardHeader.tsx` |
| Обложка поста | `src/entities/post/ui/PostCard/PostCardCover.tsx` |
| Тело (превью, счётчики лайков/комментариев) | `src/entities/post/ui/PostCard/PostCardBody.tsx` |
| Маппинг DTO → доменная модель (поля `avatarUrl`, `authorName`, `preview`, `coverUrl`, `likes`, `comments`) | `src/entities/post/model/post.mapper.ts` |
| Тип доменной модели `Post` | `src/entities/post/model/types.ts` |

Счётчики лайков и комментариев рендерятся через `<ActionButton type="like">` и `<ActionButton type="comment">` внутри `PostCardBody`.

---

### Таб-фильтр над списком: Все / Бесплатные / Платные

Фильтр рендерится над лентой в `src/app/index.tsx` и управляет тем, какие посты запрашиваются с сервера.

| Элемент | Файл |
|---|---|
| Корневой экран (размещает `<FilterTabs>` над `<Feed>`) | `src/app/index.tsx` |
| Компонент-оркестратор фильтра (список табов, подписка на стор) | `src/features/filter-tabs/ui/FilterTabs.tsx` |
| Полоса с табами | `src/features/filter-tabs/ui/TabBar/TabBar.tsx` |
| Отдельный таб (активный/неактивный стиль, `Pressable`) | `src/features/filter-tabs/ui/TabItem/TabItem.tsx` |
| MobX-стор активного фильтра (`activeFilter`, `setActiveFilter`) | `src/core/stores/filters.store.ts` |
| Тип фильтра (`TierFilter = 'all' \| 'free' \| 'paid'`) | `src/features/filter-tabs/model/types.ts` |

Табы определены прямо в `FilterTabs.tsx`:
```ts
const tabs: Tab<TierFilter>[] = [
  { key: 'all',  label: 'Все' },
  { key: 'free', label: 'Бесплатные' },
  { key: 'paid', label: 'Платные' },
];
```

При смене таба `filtersStore.setActiveFilter(key)` обновляет стор, `Feed` (обёрнут в `observer`) реагирует и передаёт новый `tier` в `usePosts`, что запускает новый запрос к API.

---

### Tap на пост → переход на детальный экран

| Элемент | Файл |
|---|---|
| `Pressable`-обёртка карточки, `router.push('/[postId]')` | `src/entities/post/ui/PostCard/PostCard.tsx` (`handleOnPress`) |
| Детальный экран (роут) | `src/app/[postId]/index.tsx` |

Платные посты (`post.isPaid === true`) не открываются: `handleOnPress` делает ранний `return` при `post.isPaid`, не вызывая навигацию.

---

### Курсорная пагинация (подгрузка при скролле вниз)

| Что | Файл |
|---|---|
| `useInfiniteQuery` с `getNextPageParam` по полю `nextCursor` | `src/features/feed/model/usePosts.tsx` |
| `fetchNext` вызывается через `onEndReached` у `FlatList` | `src/features/feed/ui/Feed.tsx` |
| Индикатор загрузки следующей страницы в футере | `src/features/feed/ui/FeedListFooter.tsx` |

Порог срабатывания `onEndReachedThreshold={0.5}` — подгрузка начинается, когда до конца списка остаётся половина видимой области.

---

### Pull-to-refresh

| Что | Файл |
|---|---|
| `<RefreshControl refreshing={isRefetching} onRefresh={refetch}>` передан в `FlatList` | `src/features/feed/ui/Feed.tsx` |

---

### Закрытый пост (`tier: "paid"`) — заглушка вместо текста

| Что | Файл |
|---|---|
| Поле `isPaid` вычисляется из `dto.tier === 'paid'` | `src/entities/post/model/post.mapper.ts` |
| При `isLocked={true}` рендерится `<PostBodySkeleton>` вместо текста | `src/entities/post/ui/PostCard/PostCardBody.tsx` |
| На обложке платного поста показывается оверлей с замком | `src/entities/post/ui/PostCard/PostCardCover.tsx` |
| Нажатие на платный пост не открывает детальную страницу | `src/entities/post/ui/PostCard/PostCard.tsx` (проверка `post.isPaid` в `handleOnPress`) |

---

### Сообщение об ошибке «Не удалось загрузить публикации» с кнопкой повтора

| Что | Файл |
|---|---|
| Полноэкранная ошибка при первой загрузке (заголовок + кнопка «Повторить») | `src/features/feed/ui/FeedError.tsx` |
| Ошибка в футере списка при сбое подгрузки следующей страницы | `src/features/feed/ui/FeedFooterError.tsx` |
| Логика выбора между полноэкранной ошибкой и футером | `src/features/feed/ui/Feed.tsx` |
| Ошибка при отсутствии сети (offline) — показывается в футере | `src/features/feed/ui/Feed.tsx` (проверка `networkStore.isOnline`) |
| Хук `usePosts` — `retry` колбэк, передаётся в кнопку повтора | `src/features/feed/model/usePosts.tsx` |

---

## Экран Post Detail

### Полный текст публикации, обложка, имя автора

Детальный экран строится как `FlatList` с шапкой (`ListHeader`) и списком комментариев.

| Элемент | Файл |
|---|---|
| Роут детального экрана (компонует `<PostWithComments>` + `<SendComment>`) | `src/app/[postId]/index.tsx` |
| `FlatList` с шапкой и комментариями | `src/features/post-with-comments/ui/PostWithComments.tsx` |
| Шапка: загружает пост, передаёт данные в `<PostDetail>` | `src/features/post-with-comments/ui/ListHeader.tsx` |
| UI детального поста (обложка, заголовок, тело, кнопки) | `src/entities/post/ui/PostDetail/PostDetail.tsx` |
| Запрос поста по ID (`GET /posts/:id`) | `src/entities/post/api/usePostById.ts` |
| Маппинг DTO → доменная модель | `src/entities/post/model/post.mapper.ts` |

---

### Кнопка лайка с анимацией (Reanimated 2): плавное увеличение счётчика + haptic feedback

Анимация реализована в компоненте `LikeButton` через `react-native-reanimated`.

| Элемент | Файл |
|---|---|
| Компонент `LikeButton` с анимацией счётчика и haptic feedback | `src/shared/ui/LikeButton/LikeButton.tsx` |
| `ActionButton` (используется в карточке ленты) — haptic feedback без анимации счётчика | `src/shared/ui/ActionButton/ActionButton.tsx` |

**Механика анимации в `LikeButton`:**

```ts
// При изменении count — пружинная анимация масштаба счётчика
useEffect(() => {
  if (prevCount.current !== count) {
    scale.value = withSequence(
      withSpring(1.3, { damping: 4, stiffness: 300 }),
      withSpring(1,   { damping: 4, stiffness: 300 }),
    );
  }
  prevCount.current = count;
}, [count, scale]);
```

Счётчик обёрнут в `<Animated.View style={animatedStyle}>`, где `animatedStyle` применяет `transform: [{ scale }]`. При нажатии вызывается `Haptics.impactAsync(ImpactFeedbackStyle.Light)` перед мутацией.

---

### Список комментариев с Lazy Load

| Элемент | Файл |
|---|---|
| `useInfiniteQuery` по курсору (`nextCursor`) для комментариев | `src/entities/comment/api/useComments.ts` |
| `FlatList` с `onEndReached` → `fetchNextPage` | `src/features/post-with-comments/ui/PostWithComments.tsx` |
| Индикатор загрузки следующей страницы в футере | `src/features/post-with-comments/ui/PostWithComments.tsx` (`ListFooterComponent`) |
| UI одного комментария (аватар, имя, текст) | `src/entities/comment/ui/CommentItem/CommentItem.tsx` |
| Маппинг DTO → доменная модель комментария | `src/entities/comment/model/comment.mapper.ts` |

Порог срабатывания `onEndReachedThreshold={0.3}`. Следующая страница запрашивается только если `hasNextPage && !isFetchingNextPage`.

---

### Поле ввода + кнопка отправки нового комментария

| Элемент | Файл |
|---|---|
| Корневой компонент (получает `postId`, вызывает мутацию) | `src/features/send-comment/ui/SendComment/SendComment.tsx` |
| UI поля ввода + кнопка отправки (`SendButton`) | `src/features/send-comment/ui/SendCommentInput/SendCommentInput.tsx` |
| MobX-стор состояния ввода (`commentText`, `isLoading`, `reset`) | `src/features/send-comment/store/send-comment.store.ts` |
| Мутация `POST /posts/:id/comments` с Zod-валидацией тела | `src/features/send-comment/api/useSendComment.ts` |

После успешной отправки `useSendComment` инвалидирует кэш `['comments', postId]`, что вызывает рефетч первой страницы комментариев. Поле ввода сбрасывается через `store.reset()`. При ошибке текст сохраняется — пользователь может повторить отправку. Haptic feedback (`ImpactFeedbackStyle.Light`) срабатывает при нажатии кнопки отправки.

---

### Real-time: новые лайки и комментарии появляются без перезагрузки (WebSocket)

WebSocket-соединение устанавливается при старте приложения в `_layout.tsx` (`wsManager.connect()`). Два хука подписываются на события в `AppProviders` и живут на протяжении всей сессии.

#### Архитектура WS-менеджера

| Элемент | Файл |
|---|---|
| Класс `WSManager` (подключение, реконнект с экспоненциальным backoff + jitter, watchdog-таймер, роутинг событий) | `src/shared/api/ws-manager.ts` |
| Синглтон `wsManager` (инициализируется из env-переменных) | `src/shared/api/ws-manager.ts` |
| Подключение WS и монтирование хуков при старте приложения | `src/app/_layout.tsx` |

**Стратегия реконнекта:** экспоненциальный backoff от 500 мс до 10 с с jitter ±200 мс. Watchdog-таймер (60 с) закрывает соединение, если сервер перестал присылать `ping`.

#### Событие `like_updated`

| Элемент | Файл |
|---|---|
| Хук-подписчик на `like_updated` | `src/features/ws-realtime-updates/model/useWsLikeUpdated.ts` |

При получении события `{ type: 'like_updated', postId, likesCount }`:
- обновляет `likes` в кэше детали поста (`['posts', 'detail', postId]`)
- обновляет `likes` во всех страницах кэша ленты (`['posts', 'list']`)

Если данные уже совпадают с optimistic update — React Query не вызывает ре-рендер.

#### Событие `comment_added`

| Элемент | Файл |
|---|---|
| Хук-подписчик на `comment_added` | `src/features/ws-realtime-updates/model/useWsCommentAdded.ts` |

При получении события `{ type: 'comment_added', postId, comment }`:
- маппит `CommentDTO` → доменную модель через `mapComment`
- добавляет комментарий в начало первой страницы кэша (`['comments', postId]`) с проверкой дубликатов по `id`
- инкрементирует `comments` в кэше детали поста
- инкрементирует `comments` во всех страницах кэша ленты

#### Лайки — optimistic update + подтверждение от сервера

Лайк работает мгновенно на UI и затем синхронизируется с сервером. Поддерживается на экране ленты и на детальной странице поста.

**Поток данных при нажатии кнопки лайка:**

1. **`onMutate`** — до отправки запроса:
   - отменяет фоновые рефетчи (`cancelQueries`), чтобы они не перезаписали optimistic update
   - сохраняет снапшоты кэша детали и всех страниц ленты для возможного отката
   - мгновенно обновляет `isLiked` и `likes` в кэше (`setQueryData` / `setQueriesData`)

2. **HTTP `POST /posts/:id/like`** — уходит параллельно с обновлением UI.

3. **`onSuccess`** — сервер возвращает `{ isLiked, likesCount }`:
   - записывает точные значения в кэш детали через `setQueryData`
   - если кэш списка существует — обновляет его через `setQueriesData`
   - если кэш списка отсутствует (например, был вытеснен) — инвалидирует его, чтобы при возврате в ленту данные подтянулись с сервером
   - без лишнего HTTP-запроса в штатном сценарии

4. **WS-событие `like_updated`** — приходит через 1–3 секунды после запроса:
   - обрабатывается в `useWsLikeUpdated`, пишет `likesCount` в кэш
   - если данные уже совпадают с шага 3 — ре-рендера не происходит
   - корректно обновляет счётчик при параллельных лайках от других пользователей

5. **`onError`** — при сбое HTTP-запроса:
   - откатывает кэш детали и ленты к снапшотам из шага 1
   - WS-событие в этом случае не придёт

| Что | Файл |
|---|---|
| Хук лайка (optimistic update, rollback, подтверждение) | `src/entities/post/api/useLike.ts` |
| Подключение хука в карточке ленты | `src/entities/post/ui/PostCard/PostCard.tsx` |
| Подключение хука на детальной странице | `src/features/post-with-comments/ui/ListHeader.tsx` |
| WS-обработчик `like_updated` | `src/features/ws-realtime-updates/model/useWsLikeUpdated.ts` |
| WS-менеджер (подключение, реконнект, роутинг событий) | `src/shared/api/ws-manager.ts` |

---

## Архитектурные решения

### Почему лайки — optimistic update, а комментарии — нет

**Лайки** обновляются оптимистично: UI реагирует мгновенно, HTTP-запрос уходит параллельно, а при ошибке кэш откатывается к снапшоту. Это оправдано по нескольким причинам:

- Операция **идемпотентна и обратима**: лайк/анлайк — бинарное состояние, которое легко откатить.
- Пользователь ожидает **мгновенной реакции** на нажатие кнопки — задержка в 200–500 мс воспринимается как баг.
- Данные **легко синхронизировать**: сервер возвращает точные `isLiked` и `likesCount`, которые записываются в кэш в `onSuccess`. Если до этого пришло WS-событие `like_updated` — React Query просто не вызывает ре-рендер, так как значения совпадают.
- Откат при ошибке **незаметен**: пользователь видит, что лайк «не прошёл», и может повторить.

**Комментарии** не используют optimistic update намеренно:

- Комментарий — **не обратимая операция** с точки зрения UX: пользователь не ожидает, что текст «исчезнет» при ошибке сети.
- Тело комментария должно пройти **серверную валидацию** (длина, содержимое), и показывать его до подтверждения сервера — значит рисковать показать то, что будет отклонено.
- После успешной отправки `useSendComment` **инвалидирует кэш** `['comments', postId]`, что вызывает рефетч первой страницы. Это гарантирует, что пользователь видит актуальные данные с сервера, включая серверный `id` и `createdAt`.
- Если пользователь открыт на экране поста, WS-событие `comment_added` **добавит комментарий в реальном времени** ещё до завершения рефетча — так что задержка практически незаметна.
- При ошибке текст **сохраняется в поле ввода** (стор не сбрасывается в `onError`), пользователь может повторить отправку.

---

### Архитектура WebSocket-интеграции

WebSocket-интеграция построена в три слоя, каждый из которых соответствует своему уровню в FSD-архитектуре проекта.

#### Слой 1 — `WSManager` (`shared/api`)

`WSManager` — класс-синглтон в `src/shared/api/ws-manager.ts`. Он отвечает исключительно за транспорт: подключение, реконнект и роутинг сырых сообщений. Бизнес-логика в него не попадает.

```
WSManager
├── connect()          — открывает WebSocket с ?token= из env
├── on(type, handler)  — подписка на тип события
├── off(type, handler) — отписка
├── routeMessage()     — парсит JSON, сбрасывает watchdog на ping, вызывает подписчиков
├── reconnect()        — экспоненциальный backoff (500 мс → 10 с) + jitter ±200 мс
└── watchdog (60 с)    — закрывает соединение, если сервер перестал присылать ping
```

Синглтон `wsManager` инициализируется из env-переменных при импорте модуля — до монтирования любого компонента. Это позволяет подписываться на события из любого места без передачи инстанса через props или контекст.

#### Слой 2 — хуки-подписчики (`features/ws-realtime-updates`)

`useWsLikeUpdated` и `useWsCommentAdded` — React-хуки, которые подписываются на `wsManager` через `useEffect` и пишут данные напрямую в кэш React Query через `useQueryClient`. Они не хранят локального состояния и не делают HTTP-запросов.

Такое разделение позволяет:
- тестировать логику обновления кэша независимо от транспорта (можно вызвать handler напрямую);
- переиспользовать `WSManager` для других событий, не трогая хуки;
- соблюдать принцип единственной ответственности — хук знает только о своём типе события.

#### Слой 3 — монтирование (`app/_layout.tsx`)

В корневом `_layout.tsx` происходит два действия:

```tsx
// 1. Подключение транспорта — один раз при старте приложения
useEffect(() => { wsManager.connect(); }, []);

// 2. Монтирование хуков-подписчиков внутри QueryClientProvider
function AppProviders() {
  useWsLikeUpdated();
  useWsCommentAdded();
  return null;
}
```

`AppProviders` — намеренно выделенный компонент-пустышка. Он монтируется **внутри** `<QueryClientProvider>`, что даёт хукам доступ к `useQueryClient()`. При этом хуки живут на протяжении всей сессии и не пересоздаются при навигации между экранами.

#### Согласованность с остальной архитектурой

| Аспект | Решение |
|---|---|
| WS-события не дублируют HTTP-запросы | Хуки пишут данные напрямую в кэш через `setQueryData` / `setQueriesData`, не вызывая `invalidateQueries` |
| Нет гонки между optimistic update и WS | `useWsLikeUpdated` пишет `likesCount` в кэш; если значение уже совпадает с результатом `onSuccess` — React Query не вызывает ре-рендер |
| Нет дублирования комментариев | `useWsCommentAdded` проверяет `id` перед prepend: если комментарий уже есть в кэше (добавлен через рефетч после отправки) — пропускает |
| Offline-режим | `networkStore` + MobX-реакция синхронизирует `onlineManager` React Query; WS реконнектится автоматически при восстановлении соединения |

---

### HTTP-клиент и нормализация ответов

Axios-клиент (`src/shared/api/client.ts`) настроен с двумя интерсепторами:

- **Request interceptor** — добавляет `Authorization: Bearer <token>` из env к каждому запросу.
- **Response interceptor** — нормализует ошибки через `normalizeError`, чтобы все слои приложения работали с единым типом ошибки.

Orval генерирует функции, которые используют `customClient` — обёртку над `apiClient`. `customClient` разворачивает вложенный ответ `{ ok, data }` и возвращает только `data`, избавляя каждый хук от ручного `response.data.data`.

---

### Конфигурация React Query

`QueryClient` создаётся один раз в `_layout.tsx` со следующими дефолтами:

| Параметр | Значение | Причина |
|---|---|---|
| `staleTime` | 5 минут | Данные ленты не меняются чаще — WS-события обновляют кэш точечно, без рефетча |
| `retry` (queries) | 3 | Сетевые сбои на мобильных устройствах временны |
| `retryDelay` | экспоненциальный backoff (1 с → 30 с) + jitter ±300 мс | Предотвращает шторм запросов при восстановлении сети |
| `retry` (mutations) | 1 | Мутации идемпотентны (лайк) или имеют side-effect (комментарий) — агрессивный ретрай нежелателен |

---

### Синхронизация сетевого статуса (MobX ↔ React Query)

`networkStore` подписывается на `NetInfo` и отслеживает не только `isConnected`, но и `isInternetReachable` — это важно для мобильных сетей, где устройство подключено к Wi-Fi, но интернет недоступен.

`setupReactions()` создаёт MobX-реакцию, которая при каждом изменении `networkStore.isOnline` вызывает `onlineManager.setOnline(isOnline)`. Это позволяет React Query автоматически:
- приостанавливать запросы в offline-режиме;
- возобновлять их и рефетчить устаревшие данные при восстановлении сети.

Реакция монтируется в `_layout.tsx` через `useEffect(() => setupReactions(), [])` и возвращает функцию отписки, которая вызывается при размонтировании.

---

**Ссылки:**
- [Figma-макет](https://www.figma.com/design/bAxXrk7TaPN13TZ60yf7uD/Test-Assignment?node-id=0-1)
- [API (Swagger)](https://k8s.mectest.ru/test-app/openapi.json)

---

## Стек

| Категория        | Технология                          |
|------------------|-------------------------------------|
| Язык             | TypeScript                          |
| Фреймворк        | React Native + Expo ~54             |
| Навигация        | Expo Router                         |
| State management | MobX + TanStack React Query v5      |
| HTTP-клиент      | Axios                               |
| Генерация API    | Orval (из Swagger)                  |
| Анимации         | React Native Reanimated 2           |
| Haptic feedback  | `expo-haptics`                      |
| Стилизация       | Дизайн-токены (`shared/styles`)     |
| Линтер           | Biome (конфиг на основе рекомендуемого Expo-пресета для ESLint + Prettier) |
| Pre-commit хуки  | Lefthook                            |

---

## Структура проекта

```
src/
├── app/                   # Роуты и layout (Expo Router)
│   ├── _layout.tsx        # Корневой layout с навигацией
│   ├── index.tsx          # Главная страница (Feed + FilterTabs)
│   └── [postId]/          # Детальная страница поста
│       └── index.tsx
│
├── core/                  # Ядро приложения
│   ├── stores/            # Глобальные MobX-сторы (network, filters, reactions)
│   └── theme/             # ThemeProvider
│
├── entities/              # Бизнес-сущности (domain layer)
│   ├── post/              # Сущность «Пост» (model + ui + api)
│   └── comment/           # Сущность «Комментарий» (model + ui + api)
│
├── features/              # Пользовательские сценарии
│   ├── feed/              # Лента публикаций (model + ui)
│   ├── filter-tabs/       # Таб-фильтр Все/Бесплатные/Платные
│   ├── post-with-comments/# Детальный пост + список комментариев
│   ├── send-comment/      # Отправка нового комментария
│   └── ws-realtime-updates/ # WS-хуки (like_updated, comment_added)
│
├── shared/                # Переиспользуемый код
│   ├── api/               # API-клиент, WS-менеджер и сгенерированные запросы
│   ├── styles/            # Дизайн-токены, тема, шрифты
│   └── ui/                # UI-компоненты (ActionButton, LikeButton, Avatar, Icon и др.)
│
└── types/                 # Глобальные декларации типов
```

### Описание слоёв

**app/** — страницы и роуты. Layout-файлы для Expo Router, структура близка к URL-адресам.

**core/** — глобальное состояние приложения: сетевой статус (NetInfo), MobX-реакции, тема.

**entities/** — бизнес-сущности (Post, Comment и др.): типы, хелперы, доменная логика. Независимы от слоя представления.

**features/** — законченные пользовательские сценарии. Каждая фича может использовать несколько сущностей и компоненты из shared.

**shared/** — общий код без привязки к конкретной фиче:
- **api/** — Axios-клиент, `WSManager` и Orval-сгенерированные запросы к бэкенду
- **styles/** — дизайн-токены, цвета, типографика, шрифты
- **ui/** — переиспользуемые UI-компоненты
