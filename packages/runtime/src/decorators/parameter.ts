import { createNoopMethodDecorator, createNoopParameterDecorator } from './noop'

/**
 * Inject http Body
 *  @param {string} [name] properties name in body object
 */
export function Body(): ParameterDecorator {
  return createNoopParameterDecorator('body')
}

/**
 * Inject value from body
 *
 * @param {string} [name] The name of the body parameter
 */
export function BodyProp(_name?: string): ParameterDecorator {
  return createNoopParameterDecorator('body-prop')
}

/**
 * Inject http request
 */
export function Request(): ParameterDecorator {
  return createNoopParameterDecorator('request')
}

/**
 * Inject value from request
 *
 * @param {name} [name] The name of the request parameter
 */
export function RequestProp(_name?: string): ParameterDecorator {
  return createNoopParameterDecorator('request-prop')
}

/**
 * Inject value from Path
 *
 * @param {string} [name] The name of the path parameter
 */
export function Path(_name?: string): ParameterDecorator {
  return createNoopParameterDecorator('path')
}

/**
 * Inject value from query string
 *
 * @param {string} [name] The name of the query parameter
 */
export function Query(_name?: string): ParameterDecorator {
  return createNoopParameterDecorator('query')
}

/**
 * Inject all query values in a single object
 */
export function Queries(): ParameterDecorator {
  return createNoopParameterDecorator('queries')
}

/**
 * Inject value from Http header
 *
 * @param {string} [name] The name of the header parameter
 */
export function Header(_name?: string): ParameterDecorator {
  return createNoopParameterDecorator('header')
}

/**
 * Mark parameter as manually injected, which will not be generated
 */
export function Inject(): ParameterDecorator {
  return createNoopParameterDecorator('inject')
}

/**
 * Inject uploaded file
 *
 * @param {string} [name] The name of the uploaded file parameter
 */
export function UploadedFile(_name?: string): ParameterDecorator {
  return createNoopParameterDecorator('uploaded-file')
}

/**
 * Inject uploaded files
 *
 * @param {string} [name] The name of the uploaded files parameter
 */
export function UploadedFiles(_name?: string): ParameterDecorator {
  return createNoopParameterDecorator('uploaded-files')
}

/**
 * Inject uploaded files
 *
 * @param {string} [name] The name of the uploaded files parameter
 */
export function FormField(_name?: string): ParameterDecorator {
  return createNoopParameterDecorator('form-field')
}

/**
 * Overrides the default media type of request body.
 * Can be used on specific method.
 * Can't be used on controller level.
 *
 * @link https://swagger.io/docs/specification/describing-request-body/
 */
export function Consumes(_value: string): MethodDecorator {
  return createNoopMethodDecorator('consumes')
}
