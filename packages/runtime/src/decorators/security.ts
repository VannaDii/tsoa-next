import { createNoopClassMethodDecorator } from './noop'

/**
 * Clears inherited security requirements for a controller or action.
 */
export function NoSecurity(): ClassDecorator & MethodDecorator {
  return createNoopClassMethodDecorator('no-security')
}

/**
 * Declares the security requirement for a controller or action.
 *
 * @param name The security scheme name, or a full security requirement object.
 * @param scopes OAuth scopes required by the scheme when `name` is a string.
 */
export function Security(name: string | { [name: string]: string[] }, scopes?: string[]): ClassDecorator & MethodDecorator {
  return createNoopClassMethodDecorator('security')
}
