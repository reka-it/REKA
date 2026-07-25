# Components

[← Back](./README.md)

## Convention

Each component lives in its own folder under `app/components/`:

```
ComponentName/
  ComponentName.tsx
  ComponentName.module.scss
  ComponentName.stories.tsx
```

The component imports its own stylesheet as `styles` and reads class names off it
(`styles.container`, `styles.label`, ...).
