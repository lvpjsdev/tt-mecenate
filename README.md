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

- Список постов: аватар автора, имя, превью текста, обложка поста, счётчик лайков и комментариев
- Курсорная пагинация (подгрузка при скролле вниз)
- Pull-to-refresh
- Закрытый пост (`tier: "paid"`) — заглушка вместо текста
- Обработка ошибок: «Не удалось загрузить публикации» с кнопкой повтора

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
