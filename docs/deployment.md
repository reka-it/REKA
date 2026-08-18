# Deployment

[← Back](./README.md)

## Hosting

The app builds as a static SPA (`ssr: false` in `react-router.config.ts`, see [react-router SPA mode](https://reactrouter.com/how-to/spa)) and is hosted on GitHub Pages, since Pages only serves static files. Route modules can't export server-only `loader`/`action` — use `clientLoader`/`clientAction` instead.

`CNAME` pins the custom domain (`reken.no`) for GitHub Pages hosting.

## Deploying

Pushing to `main` triggers `.github/workflows/deploy.yml`, which:

1. Runs `npm run build`, producing the static site in `build/client`.
2. Copies `index.html` to `404.html` so GitHub Pages serves the SPA shell (which then client-side routes) for any unmatched path.
3. Adds `.nojekyll` so Pages doesn't run Jekyll over the output.
4. Copies `CNAME` into the build output so the custom domain is preserved.
5. Publishes `build/client` via `actions/deploy-pages`.

No manual deploy step is needed; just merge to `main`. The site's GitHub Pages source must be set to "GitHub Actions" in the repo settings (Settings → Pages).
