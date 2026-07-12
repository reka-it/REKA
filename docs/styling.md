# Styling

## SCSS Modules

Every component/route has its own `*.module.scss` file, imported as `styles` and applied via
`styles.className`. Keep styles scoped to their component — shared values go in the constants
file, not copy-pasted across modules.

## Shared constants (`app/_constants.scss`)

Colors and fonts live here, imported with `@use "constants" as *;`. A couple of things to know:

- **Colors are versioned by festival year.** Each year gets its own REKA, so palettes are meant
  to be suffixed by year (e.g. `$primary-2026`, `$bg-2026`) rather than overwritten in place —
  see the comment at the top of the file. There's also a `-default` set (`$bg-default`,
  `$primary-default`, `$shadow-default`, ...) used by year-agnostic UI like modals and forms.
- Some older colors (`$reke`, `$blue`, `$red`, ...) predate the per-year convention and are
  marked "temp ... til alt blir overført til -2026" (temporary, until everything is migrated to
  the -2026 set). Prefer the versioned/`-default` variables in new code.
- `$mobile-bp-upper` is the shared mobile breakpoint.

## Mixins (`app/mixins.scss`)

- `for-mobile-only` — wraps a media query at `$mobile-bp-upper`.
- `color-shadow($size, $colors)` — builds a stacked, offset `text-shadow` from a list of
  colors (used for the layered festival title effect).

## Design language

Interactive elements (inputs, buttons, panels) generally use a hard-edged, offset
`box-shadow` in `$shadow-default` rather than blur/elevation shadows, with the shadow
collapsing on `:active` to read as a "pressed" state. Follow this pattern for new form
controls and buttons so they feel consistent with existing ones (see
`AuthModal.module.scss` / `Auth.module.scss` for an example).

## Next

- [Components](./components.md)
- [Contributing](./contributing.md) — "I løs grad følge designet til nettsiden som en helhet"
