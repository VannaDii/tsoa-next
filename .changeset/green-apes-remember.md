---
'@tsoa-next/cli': patch
'@tsoa-next/runtime': patch
'tsoa-next': patch
---

Fixed generated `@SpecPath(...)` routes so they register before regular controller routes in the Express, Koa, and Hapi templates. This prevents dynamic first-segment routes such as `/{tenant}/{resource}` from shadowing spec endpoints like `/SpecPath/spec`.

Refreshed the docs site and API reference to ship from one VitePress pipeline with `typedoc-plugin-markdown`, grouped install snippets, generated `llms.txt` output, published changelog pages, syntax-highlighted reference signatures, and source links that now point at the current GitHub `main` source files instead of generated `.d.ts` artifacts. The guides were also updated to match current behavior, including valid `@Response(...)` and `@Security(...)` examples, clearer security-scheme guidance, consistent `npm`/`pnpm`/`yarn` commands, and expanded coverage for features such as `@NoSecurity()`, `@RequestProp()`, `@Consumes()`, `generateSpecAndRoutes`, and `spec.rootSecurity`.

Published decorator typings and API docs now use plain parameter names instead of underscore-prefixed placeholders for intentionally unused public decorator arguments, while linting uses targeted exceptions for those no-op runtime signatures.

Added stronger documentation validation to CI so README sync, guide builds, and API reference generation are checked during pull requests.
