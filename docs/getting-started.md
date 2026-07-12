# Getting started

## Prerequisites

- Node.js 24 (matches the version used in the [Dockerfile](../Dockerfile))
- npm

## Install

```
npm install
```

## Environment variables

Copy `.env.example` to `.env` and fill in a Firebase project's config:

```
cp .env.example .env
```

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

See [Firebase](./firebase.md) for what these are used for.

## Run the dev server

```
npm run dev
```

## Other scripts

| Command | What it does |
| --- | --- |
| `npm run build` | Production build via `react-router build` |
| `npm run start` | Serves the production build (`build/server/index.js`) |
| `npm run typecheck` | Runs React Router's type generation, then `tsc` |

## Next

- [Architecture](./architecture.md) for how the app is put together
- [Contributing](./contributing.md) for how this project likes to be worked on
