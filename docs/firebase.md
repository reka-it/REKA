# Firebase

[← Back](./README.md)

Firebase backs auth, data, and analytics. Everything is in `app/firebase/`.

## Setup
If your developing the site, you are going to need a dev role. Ask a earlier dev to grant you the role with the admin panal, admins can't grant this role, only other devs.

You should also be added to the firebase project as a maintainer.

### Roles

users have roles which dictate what pages and actions are available to them
```
type userRole = "dev" | "admin" | "user" | null;
```
