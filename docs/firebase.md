# Firebase

Firebase backs auth, data, and analytics. Everything lives in `app/firebase/`.

## Setup

`firebase.ts` initializes the app from `VITE_FIREBASE_*` env vars (see
[Getting started](./getting-started.md)) and exports the shared `app`, `db`, `auth`, and
`analytics` instances. It guards against re-initializing the app on hot reload with
`getApps().length ? getApp() : initializeApp(...)`.

## Auth (`auth.ts`)

- `signUp(email, password)` / `logIn(email, password)` — wrap the Firebase Auth SDK calls and
  return a discriminated `AuthResult`:
  ```ts
  type AuthResult =
    | { success: true; user: User }
    | { success: false; field: "email" | "password" | "root"; message: string; code: string };
  ```
  `field` tells the caller which form field the error belongs to, so `Auth`/`AuthModal` can
  attach it to the right input instead of a generic banner.
- `logOut()` — signs the current user out.
- `setAuth(email, role)` — looks up a user by email in Firestore and updates their `role`.
- `mapAuthError(code)` — translates Firebase Auth error codes into a field + user-facing message.
  Extend this switch when a new Firebase error code needs a friendlier message.

### Roles

```ts
type userRole = "dev" | "admin" | "user" | null;
```

Used to gate things like `/admin` — see [Architecture](./architecture.md#routing).

## Firestore (`firestore.ts`)

Helpers for reading/writing Firestore documents (e.g. `createUser` used by `signUp`).

## Hooks

- `useAuth.tsx` — exposes the current Firebase user/role to components.
- `useValue.tsx` — generic Firestore value subscription hook.
- `useHypeCounter.tsx` — backs the `HypeButton` component.

## Next

- [Components](./components.md) for where these hooks are consumed
- [Contributing](./contributing.md) for conventions when adding new Firebase calls
