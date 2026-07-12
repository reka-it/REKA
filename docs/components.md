# Components

## Convention

Each component lives in its own folder under `app/components/`, named in PascalCase, with:

```
ComponentName/
  ComponentName.tsx
  ComponentName.module.scss
```

The component imports its own stylesheet as `styles` and reads class names off it
(`styles.container`, `styles.label`, ...). Keep the pair together — don't split markup and
styles for the same component across folders.

## Current components

| Component | Purpose |
| --- | --- |
| `Auth` | The actual login/signup form (fields, validation, submit handlers) |
| `AuthModal` | Wraps `Auth` in a `Modal` |
| `Button` | Shared button styling |
| `Footer` | Site footer |
| `GrainOverlay` | Decorative overlay effect |
| `HypeButton` | The hype/interest counter button, backed by `useHypeCounter` (see [Firebase](./firebase.md)) |
| `Modal` | Generic modal shell used by `AuthModal` and others |
| `Navbar` | Site navigation |
| `Page` | Page layout wrapper |
| `Pattern` | Decorative background pattern |
| `Title` | Shared title/heading styling |

This table is a starting point — flesh out a component's row (or give it its own doc) as it
grows non-obvious props or behavior. See [Contributing](./contributing.md) for why documenting
as you go matters here.

## Next

- [Styling](./styling.md) for the SCSS conventions these components follow
