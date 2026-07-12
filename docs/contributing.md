# Contributing

## Philosophy

> When developing this site you should think about:
> - Another team is going to develop furter next year. So make it readable, write docs and comment and put effort into the page :D.
> - Make sure that other pages, aka yearly ones. Are not drasticaly changed by new changes. If possible keep the original assets, components and styles. 
> - Follow the design to a loose degree when creating the next years page. Follow it more closely when developing default pages.

## In practice

- Isolate year-specific work: Yearly reka content goes under `app/routes/reka/` and gets
  its own route + styles rather than editing previous year pages. See
  [Architecture](./architecture.md#routing) and the year-suffixed color convention in
  [Styling](./styling.md).

## Opening issues / PRs

Use GitHub issues for ides and shared work. Seperate tasks and commit them alone, also write good commit messages. 
