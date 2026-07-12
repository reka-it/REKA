# Deployment

## Docker build

The [Dockerfile](../Dockerfile) is a multi-stage build:

1. **development-dependencies-env** — `npm ci` with dev dependencies, used for the build step.
2. **production-dependencies-env** — `npm ci --omit=dev`, used for the final runtime image.
3. **build-env** — runs `npm run build` using the dev-dependency install.
4. Final stage — copies only `package.json`, production `node_modules`, and the built
   `build/` output, then runs `npm run start`.

Build the image from the repo root:

```
docker build -t reka .
docker run -p 3000:3000 --env-file .env reka
```

The container needs the same `VITE_FIREBASE_*` env vars described in
[Getting started](./getting-started.md) — Vite inlines them at build time, so they must be
present when the image is built, not just at runtime.

## Hosting

`CNAME` pins the custom domain (`reken.no`) for GitHub Pages-style static hosting of the repo,
separate from the Docker deployment path above — check which one is actually in use before
assuming the other applies.

## Next

- [Getting started](./getting-started.md) for local env var setup
