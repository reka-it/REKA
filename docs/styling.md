# Styling

## SCSS Modules

Every component/route has its own `*.module.scss` file, imported as `styles` and applied via
`styles.className`.

## Shared constants (`app/_constants.scss`)

Colors and fonts: imported with `@use "constants" as *;`. A couple of things to know:

- Colors are versioned by year: Each year gets its own variables, so palettes are meant
  to be suffixed by year (e.g. `$primary-2026`, `$bg-2026`) rather than overwritten. There's also a `-default` set (`$bg-default`, `$primary-default`, `$shadow-default`, ...) used by year-agnostic UI.

## Design language
