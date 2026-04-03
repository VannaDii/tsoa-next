import { createNoopMethodDecorator } from './noop'

export function Options(_value?: string): MethodDecorator {
  return createNoopMethodDecorator('options')
}

export function Get(_value?: string): MethodDecorator {
  return createNoopMethodDecorator('get')
}

export function Post(_value?: string): MethodDecorator {
  return createNoopMethodDecorator('post')
}

export function Put(_value?: string): MethodDecorator {
  return createNoopMethodDecorator('put')
}

export function Patch(_value?: string): MethodDecorator {
  return createNoopMethodDecorator('patch')
}

export function Delete(_value?: string): MethodDecorator {
  return createNoopMethodDecorator('delete')
}

export function Head(_value?: string): MethodDecorator {
  return createNoopMethodDecorator('head')
}
