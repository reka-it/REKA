# Figma

[← Back](./README.md)

Best practices for using Figma on this project. See [Contributing](./contributing.md)
for the same philosophy applied to code, and [Styling](./styling.md) for how it maps to
SCSS.

## One file per year

Mirror the codebase's yearly convention `app/routes/reka/` make a **new Figma file per year**
(`REKA 2026`, `REKA 2027`, ...) instead of editing the previous year's file in place.

- Don't redesign or overwrite an old year's file. Duplicate it or start fresh so
  past years stay intact for reference.
- No need to create a new default figma for new default changes, use the original one. Or a default v2 if you want :3 

## Use variables, named like the SCSS constants

We use `app/_constants.scss` versions colors by year (`$bg-2026`, `$primary-2026`) and a
`-default` set for year-agnostic UI. Figma variables should mirror this, so name them the same:

- Use variables (not raw hex fills or plain color styles) on every layer that should
  track a palette. It makes it easier to test a new palette or a
  other tweak's by just changing the variable instead of hunting down colors everywhere.
- When a new year's palette is decided is set in stone, add it too
  `_constants.scss`.

## Components match the codebase

Its advisable to create a figma file / page for each component and then copy - paste to other components.
