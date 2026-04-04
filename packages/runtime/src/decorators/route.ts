import { createNoopClassDecorator, createNoopHiddenDecorator } from './noop'

export function Route(_name?: string): ClassDecorator {
  return createNoopClassDecorator('route')
}

/**
 * can be used to entirely hide an method from documentation
 */
export function Hidden(): ClassDecorator & MethodDecorator & ParameterDecorator {
  return createNoopHiddenDecorator('hidden')
}
