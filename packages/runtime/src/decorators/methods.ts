import { createNoopMethodDecorator } from './noop'

/** Marks a controller method as handling HTTP `OPTIONS` requests for the given relative path. */
export function Options(value?: string): MethodDecorator {
  return createNoopMethodDecorator('options')
}

/** Marks a controller method as handling HTTP `GET` requests for the given relative path. */
export function Get(value?: string): MethodDecorator {
  return createNoopMethodDecorator('get')
}

/** Marks a controller method as handling HTTP `POST` requests for the given relative path. */
export function Post(value?: string): MethodDecorator {
  return createNoopMethodDecorator('post')
}

/** Marks a controller method as handling HTTP `PUT` requests for the given relative path. */
export function Put(value?: string): MethodDecorator {
  return createNoopMethodDecorator('put')
}

/** Marks a controller method as handling HTTP `PATCH` requests for the given relative path. */
export function Patch(value?: string): MethodDecorator {
  return createNoopMethodDecorator('patch')
}

/** Marks a controller method as handling HTTP `DELETE` requests for the given relative path. */
export function Delete(value?: string): MethodDecorator {
  return createNoopMethodDecorator('delete')
}

/** Marks a controller method as handling HTTP `HEAD` requests for the given relative path. */
export function Head(value?: string): MethodDecorator {
  return createNoopMethodDecorator('head')
}
