# Architecture

[← Back](./README.md)

## Stack

- [React Router 8](https://reactrouter.com/).
- TypeScript.
- SCSS.
- [Firebase](./firebase.md)

## Folder layout

```
app/
  components/   UI components, one folder per component (see components.md)
  firebase/     Firebase init, database and user auth, hooks
  routes/       Routing
  styles/       SCSS modules for main pages
public/         Assets
.storybook/     Storybook config
docs/           You are here
```

### React router
Try to set yourself decently into react router framework mode before starting development, key points are:
* The route config ```routes.ts```
* Layout pages
* Loaders
* Navigation
