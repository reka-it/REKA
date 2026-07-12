# Components

## Convention

Each component lives in its own folder under `app/components/`:

```
ComponentName/
  ComponentName.tsx
  ComponentName.module.scss
```

The component imports its own stylesheet as `styles` and reads class names off it
(`styles.container`, `styles.label`, ...).
