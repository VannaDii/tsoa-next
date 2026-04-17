# Generating Routes and OAS

Relevant API reference: [`Config`](../reference/tsoa-next/interfaces/Config.md), [`generateRoutes`](../reference/@tsoa-next/cli/functions/generateRoutes.md), [`generateSpec`](../reference/@tsoa-next/cli/functions/generateSpec.md), [`generateSpecAndRoutes`](../reference/@tsoa-next/cli/functions/generateSpecAndRoutes.md), [`ExtendedRoutesConfig`](../reference/@tsoa-next/cli/interfaces/ExtendedRoutesConfig.md), and [`ExtendedSpecConfig`](../reference/@tsoa-next/cli/interfaces/ExtendedSpecConfig.md).

## Using CLI

### Basic Commands

```bash
# generate OAS
tsoa spec

# generate routes
tsoa routes

# discover config files beneath the current directory
tsoa discover

# discover config files beneath a path or glob
tsoa discover "packages/*"
```

### Options

#### OpenAPI Specification (OAS) generation

```
Usage: tsoa spec [options]

Options:
   --configuration, -c  tsoa configuration file; default is tsoa.json in the working directory  [string]
   --discover  discover tsoa config files using a path or glob before running the command       [string]
   --host  API host                                                                             [string]
   --basePath  Base API path                                                                    [string]
```

#### Route generation

```
Usage: tsoa routes [options]

Options:
  --configuration, -c  tsoa configuration file; default is tsoa.json in the working directory   [string]
  --discover  discover tsoa config files using a path or glob before running the command        [string]
  --basePath  Base API path                                                                     [string]
```

#### Config discovery

```
Usage: tsoa discover [pathOrGlob]
```

- `discover` searches beneath the provided path, or beneath the current working directory when no argument is provided.
- Glob inputs are supported, so commands like `tsoa discover "packages/*"` or `tsoa spec --discover "services/*"` will expand matching roots first.
- Discovery recognizes these conventional config filenames:
  - `tsoa.json`
  - `tsoa.yaml`
  - `tsoa.yml`
  - `tsoa.config.js`
  - `tsoa.config.cjs`
- `spec`, `routes`, and `spec-and-routes` can fan out across all discovered configs:

```bash
tsoa spec --discover "packages/*"
tsoa routes --discover "./services"
tsoa spec-and-routes --discover .
```

You can find the Reference for the tsoa configuration file [here](../reference/tsoa-next/interfaces/Config.md)

For information on the configuration object (`tsoa.json`), you may also be interested in:

[`Config` interface reference](../reference/tsoa-next/interfaces/Config.md)

[Configuration sample](https://github.com/tsoa-next/tsoa-next/blob/main/tests/tsoa.json)

## Programmatic

Import programmatic generation APIs from `tsoa-next/cli`. The root `tsoa-next` entrypoint is runtime-only and should be used for decorators and runtime helpers.

```typescript
import { generateRoutes, generateSpec, generateSpecAndRoutes, ExtendedRoutesConfig, ExtendedSpecConfig } from 'tsoa-next/cli'

;(async () => {
  const specOptions: ExtendedSpecConfig = {
    basePath: '/api',
    entryFile: './api/server.ts',
    specVersion: 3,
    outputDirectory: './api/dist',
    controllerPathGlobs: ['./routeControllers/**/*Controller.ts'],
  }

  const routeOptions: ExtendedRoutesConfig = {
    basePath: '/api',
    entryFile: './api/server.ts',
    routesDir: './api',
  }

  await generateSpec(specOptions)

  await generateRoutes(routeOptions)

  // Or generate both outputs from one shared metadata pass:
  await generateSpecAndRoutes({
    configuration: {
      entryFile: './api/server.ts',
      controllerPathGlobs: ['./routeControllers/**/*Controller.ts'],
      spec: {
        outputDirectory: './api/dist',
        specVersion: 3.1,
      },
      routes: {
        routesDir: './api',
      },
    },
  })
})()
```

**Note:** If you use tsoa programmatically, please be aware that tsoa's methods can (under rare circumstances) change in minor and patch releases. But if you are using tsoa in a .ts file, then TypeScript will help you migrate to any changes. We reserve this right to change what are essentially our internal methods so that we can continue to provide incremental value to the majority user (our CLI users). The CLI however will only receive breaking changes during a major release.
