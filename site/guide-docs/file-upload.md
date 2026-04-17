# Uploading files

Relevant API reference: [`File`](../reference/tsoa-next/interfaces/File.md), [`@FormField`](../reference/tsoa-next/functions/FormField.md), [`@UploadedFile`](../reference/tsoa-next/functions/UploadedFile.md), and [`@UploadedFiles`](../reference/tsoa-next/functions/UploadedFiles.md).

## Install the runtime upload middleware

For Express:

::: code-group

```bash [npm]
npm install multer
npm install -D @types/multer
```

```bash [pnpm]
pnpm add multer
pnpm add -D @types/multer
```

```bash [yarn]
yarn add multer
yarn add -D @types/multer
```

:::

For Koa:

::: code-group

```bash [npm]
npm install @koa/multer
```

```bash [pnpm]
pnpm add @koa/multer
```

```bash [yarn]
yarn add @koa/multer
```

:::

## Using the `@UploadedFile` / `@UploadedFiles` decorators

The built-in upload decorators use tsoa-next's exported [`File`](../reference/tsoa-next/interfaces/File.md) interface.
Use [`@FormField()`](../reference/tsoa-next/functions/FormField.md) for the non-file multipart fields that arrive alongside the upload.

```ts
import { Controller, File, FormField, Post, Route, UploadedFile, UploadedFiles } from 'tsoa-next'

@Route('files')
export class FilesController extends Controller {
  @Post('single')
  public async uploadSingle(@FormField() title: string, @UploadedFile('asset') asset: File): Promise<{ title: string; originalName: string }> {
    return {
      title,
      originalName: asset.originalname,
    }
  }

  @Post('many')
  public async uploadMany(@UploadedFiles('assets') assets: File[]): Promise<{ count: number }> {
    return {
      count: assets.length,
    }
  }
}
```

## Default storage behavior

Generated Express and Koa routes create a default multer instance when you use upload decorators.
By default that instance keeps uploaded files in memory.

If you want uploads written to disk or handled by a custom multer configuration, pass your own multer instance into `RegisterRoutes(...)`.

## Custom multer configuration

Express example:

```ts
import express, { json, urlencoded } from 'express'
import multer from 'multer'
import { RegisterRoutes } from '../build/routes'

const app = express()

app.use(urlencoded({ extended: true }))
app.use(json())

RegisterRoutes(app, {
  multer: multer({ dest: 'uploads/' }),
})
```

Koa example:

```ts
import Router from '@koa/router'
import multer from '@koa/multer'
import { RegisterRoutes } from '../build/routes'

const router = new Router()

RegisterRoutes(router, {
  multer: multer({ dest: 'uploads/' }),
})
```

There is also a legacy top-level `multerOpts` config field in `tsoa.json`, but it is deprecated.
Prefer passing a concrete multer instance into `RegisterRoutes(...)`.

## Manual multipart handling

If you choose to bypass `@UploadedFile(...)` and call multer yourself inside a controller using `@Request()`, you are also responsible for documenting that request shape yourself.
In that case, merge the multipart request details into `spec.spec` in `tsoa.json` so the generated OpenAPI document still describes the endpoint accurately.
