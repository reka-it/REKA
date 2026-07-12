# Architecture

## Stack

- [React Router 8](https://reactrouter.com/) in framework mode (file-based route config, SSR via `@react-router/serve`)
- TypeScript
- SCSS Modules for styling
- [Firebase](./firebase.md) (Auth, Firestore, Analytics) for backend needs

## Folder layout

```
app/
  components/   UI components, one folder per component (see components.md)
  firebase/     Firebase init, auth helpers, Firestore helpers, hooks
  routes/       Route modules, wired up in app/routes.ts
  styles/       Shared SCSS (design tokens/constants, globals)
public/         Static assets served as-is
build/          Build output (generated, not committed)
docs/           You are here
```

## Routing

Routes are declared in `app/routes.ts` using React Router's config API rather than pure
file-based conventions:

```ts
export default [
	index("routes/home.tsx"),
	...prefix("reka", [
		route("2026", "routes/reka/reka2026.tsx"),
		route(":slug", "routes/reka/ingenReka.tsx"),
	]),
	route("admin", "routes/admin.tsx"),
	route("earlier", "routes/earlier.tsx"),
	route("*", "routes/notFound.tsx"),
] satisfies RouteConfig;
```

A few things worth knowing:

- `/reka/2026` is this year's festival page; `/reka/:slug` is a catch-all for other years
  (see `ingenReka.tsx` — "no REKA" — for how an unknown/past year is handled).
- `/admin` is gated behind auth — see [Firebase](./firebase.md) for roles.
- `*` falls through to `notFound.tsx`.

When adding a route, register it in `app/routes.ts` and keep the route module in
`app/routes/` (nest under a subfolder like `reka/` if it belongs to a group).

## Next

- [Components](./components.md)
- [Firebase](./firebase.md)
- [Styling](./styling.md)
