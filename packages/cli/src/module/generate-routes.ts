import * as ts from 'typescript'
import type { ExtendedRoutesConfig, RouteGeneratorModule } from '../api'
import { MetadataGenerator } from '../metadataGeneration/metadataGenerator'
import { Config as BaseConfig, Tsoa } from '@tsoa-next/runtime'
import { DefaultRouteGenerator } from '../routeGeneration/defaultRouteGenerator'
import { fsMkDir } from '../utils/fs'
import * as path from 'node:path'
import { pathToFileURL } from 'node:url'

export async function generateRoutes<Config extends ExtendedRoutesConfig>(
  routesConfig: Config,
  compilerOptions?: ts.CompilerOptions,
  ignorePaths?: string[],
  /**
   * pass in cached metadata returned in a previous step to speed things up
   */
  metadata?: Tsoa.Metadata,
  defaultNumberType?: BaseConfig['defaultNumberType'],
) {
  metadata ??= new MetadataGenerator(routesConfig.entryFile, compilerOptions, ignorePaths, routesConfig.controllerPathGlobs, routesConfig.rootSecurity, defaultNumberType).Generate()

  const routeGenerator = await getRouteGenerator(metadata, routesConfig)

  await fsMkDir(routesConfig.routesDir, { recursive: true })
  await routeGenerator.GenerateCustomRoutes()

  if (routesConfig.multerOpts) {
    console.warn(
      'Config MulterOptions is deprecated since v6.4.0 instroduces RegisterRoutes can pass multerOptions,' +
        'we will quickly remove this options soon at future version.' +
        '(https://github.com/lukeautry/tsoa/issues/1587#issuecomment-2391291433)' +
        '(https://github.com/lukeautry/tsoa/pull/1638)',
    )
  }

  return metadata
}

async function getRouteGenerator<Config extends ExtendedRoutesConfig>(metadata: Tsoa.Metadata, routesConfig: Config) {
  // default route generator for express/koa/hapi
  // custom route generator
  const routeGenerator = routesConfig.routeGenerator
  if (routeGenerator !== undefined) {
    if (typeof routeGenerator === 'string') {
      try {
        // try as a module import
        const module = (await import(routeGenerator)) as RouteGeneratorModule<Config>
        return new module.default(metadata, routesConfig)
      } catch (moduleImportError) {
        try {
          const resolvedRouteGeneratorPath = require.resolve(path.resolve(routeGenerator))
          const fileSpecifier = pathToFileURL(resolvedRouteGeneratorPath).href
          const module = (await import(fileSpecifier)) as RouteGeneratorModule<Config>
          return new module.default(metadata, routesConfig)
        } catch (fileImportError) {
          throw new AggregateError([moduleImportError, fileImportError], `Failed to load route generator '${routeGenerator}' as a module import or file path.`)
        }
      }
    }

    return new routeGenerator(metadata, routesConfig)
  }

  if (routesConfig.middleware === undefined && routesConfig.middlewareTemplate === undefined) {
    routesConfig.middleware = 'express'
  }

  return new DefaultRouteGenerator(metadata, routesConfig)
}
