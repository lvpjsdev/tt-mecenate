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
| `EXPO_PUBLIC_API_TOKEN` | UUID пользователя, используется как Bearer-токен (`Authorization: Bearer <uuid>`). Любой валидный UUID, например `550e8400-e29b-41d4-a716-446655440000` |

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

**Что реализовано:**

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
| Стилизация       | Дизайн-токены (`shared/styles`)     |
| Линтер           | Biome (конфиг на основе рекомендуемого Expo-пресета для ESLint + Prettier) |
| Pre-commit хуки  | Lefthook                            |

---

## Структура проекта

```
src/
├── app/                   # Роуты и layout (Expo Router)
│   ├── _layout.tsx        # Корневой layout с навигацией
│   └── index.tsx          # Главная страница (Feed)
│
├── core/                  # Ядро приложения
│   ├── stores/            # Глобальные MobX-сторы (network, reactions)
│   └── theme/             # ThemeProvider
│
├── entities/              # Бизнес-сущности (domain layer)
│   └── post/              # Сущность «Пост» (model + ui)
│
├── features/              # Пользовательские сценарии
│   └── feed/              # Лента публикаций (model + ui)
│
├── shared/                # Переиспользуемый код
│   ├── api/               # API-клиент и сгенерированные запросы
│   ├── styles/            # Дизайн-токены, тема, шрифты
│   └── ui/                # UI-компоненты (Button, Avatar, Icon и др.)
│
└── types/                 # Глобальные декларации типов
```

### Описание слоёв

**app/** — страницы и роуты. Layout-файлы для Expo Router, структура близка к URL-адресам.

**core/** — глобальное состояние приложения: сетевой статус (NetInfo), MobX-реакции, тема.

**entities/** — бизнес-сущности (Post и др.): типы, хелперы, доменная логика. Независимы от слоя представления.

**features/** — законченные пользовательские сценарии (Feed и др.). Каждая фича может использовать несколько сущностей и компоненты из shared.

**shared/** — общий код без привязки к конкретной фиче:
- **api/** — Axios-клиент и Orval-сгенерированные запросы к бэкенду
- **styles/** — дизайн-токены, цвета, типографика, шрифты
- **ui/** — переиспользуемые UI-компоненты
