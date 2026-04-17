---
'@tsoa-next/cli': patch
'@tsoa-next/runtime': patch
'tsoa-next': patch
---

Fixed generated `@SpecPath(...)` routes so they register before regular controller routes in the Express, Koa, and Hapi templates. This prevents dynamic first-segment routes such as `/{tenant}/{resource}` from shadowing spec endpoints like `/SpecPath/spec`.

Refreshed the docs and API reference to match current behavior, including valid `@Response(...)` and `@Security(...)` examples, clearer guidance that security scheme names are user-defined, and updated coverage for features such as `@NoSecurity()`, `@RequestProp()`, `@Consumes()`, `generateSpecAndRoutes`, and `spec.rootSecurity`.

Added stronger documentation validation to CI so README sync, guide builds, and API reference generation are checked during pull requests.
