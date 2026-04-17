import { createNoopMethodDecorator, createNoopParameterDecorator } from './noop'

/**
 * Binds the full HTTP request body to a controller parameter.
 */
export function Body(): ParameterDecorator {
  return createNoopParameterDecorator('body')
}

/**
 * Binds a single property from the request body to a controller parameter.
 *
 * @param name The property name to read from the request body. Defaults to the parameter name.
 */
export function BodyProp(name?: string): ParameterDecorator {
  return createNoopParameterDecorator('body-prop')
}

/**
 * Injects the underlying runtime request object.
 */
export function Request(): ParameterDecorator {
  return createNoopParameterDecorator('request')
}

/**
 * Binds a property from the underlying runtime request object.
 *
 * @param name The request property name to read. Defaults to the parameter name.
 */
export function RequestProp(name?: string): ParameterDecorator {
  return createNoopParameterDecorator('request-prop')
}

/**
 * Binds a path parameter from the request URL.
 *
 * @param name The path parameter name. Defaults to the parameter name.
 */
export function Path(name?: string): ParameterDecorator {
  return createNoopParameterDecorator('path')
}

/**
 * Binds a query-string value to a controller parameter.
 *
 * @param name The query parameter name. Defaults to the parameter name.
 */
export function Query(name?: string): ParameterDecorator {
  return createNoopParameterDecorator('query')
}

/**
 * Binds the entire query object to a single controller parameter.
 */
export function Queries(): ParameterDecorator {
  return createNoopParameterDecorator('queries')
}

/**
 * Binds an HTTP header value to a controller parameter.
 *
 * @param name The header name. Defaults to the parameter name.
 */
export function Header(name?: string): ParameterDecorator {
  return createNoopParameterDecorator('header')
}

/**
 * Marks a parameter as injected by user code so tsoa skips route-generation metadata for it.
 */
export function Inject(): ParameterDecorator {
  return createNoopParameterDecorator('inject')
}

/**
 * Binds a single uploaded file from a multipart/form-data request.
 *
 * @param name The multipart field name. Defaults to the parameter name.
 */
export function UploadedFile(name?: string): ParameterDecorator {
  return createNoopParameterDecorator('uploaded-file')
}

/**
 * Binds multiple uploaded files from a multipart/form-data request.
 *
 * @param name The multipart field name. Defaults to the parameter name.
 */
export function UploadedFiles(name?: string): ParameterDecorator {
  return createNoopParameterDecorator('uploaded-files')
}

/**
 * Binds a regular multipart form field from a multipart/form-data request.
 *
 * @param name The multipart field name. Defaults to the parameter name.
 */
export function FormField(name?: string): ParameterDecorator {
  return createNoopParameterDecorator('form-field')
}

/**
 * Overrides the media type used to document a request body for a single action.
 *
 * @param value The request body media type, for example `application/json`.
 * See {@link https://swagger.io/docs/specification/describing-request-body/ Swagger request-body documentation}.
 */
export function Consumes(value: string): MethodDecorator {
  return createNoopMethodDecorator('consumes')
}
