# Contributing

## Philosophy

From the root [README](../README.md), the philosophy for working on this site (kept in the
original Norwegian):

> Ved utvikling av siden bør du:
> - Regne med at det kommer en reka neste år også
> - Lage årets side sånn at andre sider ikke blir endret
> - I løs grad følge designet til nettsiden som en helhet
> - Huske at noen andre også skal kode denne nettsiden etter deg, så gjør det leselig. God kode,
>   kommenter, lag issues og skriv docs.

In short: assume there's a REKA next year too, build this year's page without breaking other
years' pages, loosely follow the site's overall design, and write for the person who inherits
this code after you — readable code, comments, issues, and docs.

## What that means in practice

- **Isolate year-specific work.** New festival content goes under `app/routes/reka/` and gets
  its own route + styles rather than editing shared/previous-year pages in place. See
  [Architecture](./architecture.md#routing) and the year-suffixed color convention in
  [Styling](./styling.md).
- **Keep components self-contained.** One folder per component, markup + styles together — see
  [Components](./components.md).
- **Document as you go.** If you add a route, component, or Firebase call that isn't obvious
  from its name, add a line to the relevant doc in this folder (or a new page, linked from
  [docs/README.md](./README.md)). Screenshots go in [docs/images/](./images).
- **Prefer the versioned/default design tokens** in `_constants.scss` over the older
  un-suffixed ones when writing new styles.

## Opening issues / PRs

Use GitHub issues for anything non-obvious you find or leave behind — per the philosophy above,
the next person maintaining this won't have the context you have right now.
