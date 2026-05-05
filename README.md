# Mecenate — Test App

Expo/React Native application for mobile developer test assignment.

## Features

- 📱 Cross-platform (iOS, Android, Web)
- 🔄 Feed with pagination and filtering (free/paid posts)
- ❤️ Like/unlike posts with real-time WebSocket updates
- 💬 Comments with real-time updates
- 🎨 Modern UI with theming support
- 🔒 UUID-based authentication

## API

The app consumes [Mecenate Test API](https://k8s.mectest.ru/test-app/docs):
- REST endpoints for posts, likes, comments
- WebSocket for real-time events (`like_updated`, `comment_added`, `ping`)
- All responses use envelope: `{ "ok": true/false, "data": {...} }`

## Mock Server

A local mock server with full API implementation is available in `mock-server/` directory.

### Quick Start

```bash
cd mock-server
npm install
npm run dev
```

Server runs at `http://localhost:3000` with WebSocket at `ws://localhost:3000/test-app/ws`.

### Features

- ✅ Full REST API implementation (posts, likes, comments)
- ✅ WebSocket events with correct delays (1-3s for `like_updated`)
- ✅ In-memory storage with test data (25 posts, nested comments)
- ✅ Error simulation (`?simulate_error=true`, 401, 404, 400)
- ✅ UUID token validation
- ✅ Pagination (`cursor`, `limit`) and filtering (`tier`)

### Integration with App

Edit `.env.local`:

```env
EXPO_PUBLIC_API_URL=http://localhost:3000/test-app
EXPO_PUBLIC_WS_URL=ws://localhost:3000/test-app/ws
EXPO_PUBLIC_API_TOKEN=550e8400-e29b-41d4-a716-446655440000
```

Or use the convenience script:

```bash
npm run dev:mock  # Runs mock server + Expo concurrently
```

See [mock-server/README.md](mock-server/README.md) for full documentation.

## Getting Started

```bash
# Install dependencies
npm install

# Start Expo development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web
```

## Development with Mock Server

The project includes a local mock server in `mock-server/` directory that fully implements the Mecenate Test API.

### Quick Start

```bash
# Terminal 1: Start mock server
npm run mock-server

# Terminal 2: Start Expo (in another terminal)
npm start
```

Or use the convenience script to run both concurrently:

```bash
npm run dev:mock
```

### Mock Server Features

- ✅ Full REST API implementation (matches OpenAPI spec)
- ✅ WebSocket events: `ping` (every 30s), `like_updated` (1-3s delay), `comment_added`
- ✅ In-memory storage with test data (25 posts, comments)
- ✅ Error simulation (`?simulate_error=true` → 500, invalid UUID → 401, not found → 404)
- ✅ Pagination (`cursor`, `limit`) and filtering (`tier=free|paid`)

### Environment Configuration

Create `.env.local` from `.env.example` and uncomment mock server settings:

```env
# For mock server (local development)
EXPO_PUBLIC_API_URL=http://localhost:3000/test-app
EXPO_PUBLIC_WS_URL=ws://localhost:3000/test-app/ws
EXPO_PUBLIC_API_TOKEN=550e8400-e29b-41d4-a716-446655440000
```

Or use production API:

```env
# For production API
EXPO_PUBLIC_API_URL=https://k8s.mectest.ru/test-app
EXPO_PUBLIC_WS_URL=wss://k8s.mectest.ru/test-app/ws
```

See [mock-server/README.md](mock-server/README.md) for full documentation.

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
EXPO_PUBLIC_API_URL=https://k8s.mectest.ru/test-app
EXPO_PUBLIC_WS_URL=wss://k8s.mectest.ru/test-app/ws
EXPO_PUBLIC_API_TOKEN=your-uuid-token-here
```

## Scripts

- `npm start` — Start Expo
- `npm run ios` — Run on iOS
- `npm run android` — Run on Android
- `npm run mock-server` — Start mock server
- `npm run dev:mock` — Start mock server + Expo concurrently
- `npm run lint` — Lint with Biome
- `npm run typecheck` — TypeScript type checking
- `npm run generate-api` — Regenerate API client from OpenAPI spec

## Project Structure

```
src/
├── app/              # Expo Router screens
├── core/            # Stores, themes, config
├── entities/         # Domain entities (Post, Comment)
├── features/         # Feature modules (feed, comments, likes)
└── shared/          # Shared utilities, API client, UI components
    └── api/         # Generated API client (Orval)
```

## Tech Stack

- **Expo 54** + **React Native 0.81**
- **React 19** with TypeScript
- **TanStack React Query v5** — data fetching
- **MobX** — state management
- **Orval** — type-safe API client generation
- **Zod** — runtime validation
- **Hono** — mock server framework
