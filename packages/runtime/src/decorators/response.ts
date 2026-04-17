import { IsValidHeader } from '../utils/isHeaderType'
import { HttpStatusCodeLiteral, HttpStatusCodeStringLiteral, OtherValidOpenApiHttpStatusCode } from '../interfaces/response'
import { createNoopClassMethodDecorator, createNoopMethodDecorator, createNoopParameterDecorator } from './noop'

/**
 * Declares the successful response status, description, and media types for an operation.
 *
 * @param name The HTTP status code returned when the operation succeeds.
 * @param description The response description shown in the generated OpenAPI document.
 * @param produces The response media type or media types.
 */
export function SuccessResponse<HeaderType extends IsValidHeader<HeaderType> = object>(name: string | number, description?: string, produces?: string | string[]): MethodDecorator {
  return createNoopMethodDecorator('success-response')
}

/**
 * Adds a documented response that can be attached to a method or a controller.
 *
 * @param name The HTTP status code, OpenAPI response range, or `default`.
 * @param description The response description shown in the generated OpenAPI document.
 * @param example An example payload for the response schema.
 * @param produces The response media type or media types.
 */
export function Response<ExampleType, HeaderType extends IsValidHeader<HeaderType> = object>(
  name: HttpStatusCodeLiteral | HttpStatusCodeStringLiteral | OtherValidOpenApiHttpStatusCode,
  description?: string,
  example?: ExampleType,
  produces?: string | string[],
): MethodDecorator & ClassDecorator {
  return createNoopClassMethodDecorator('response')
}

/**
 * Inject a library-agnostic responder function that can be used to construct type-checked (usually error-) responses.
 *
 * Annotate the parameter as `TsoaResponse<Status, Data, Headers>` so tsoa can infer the documented response.
 */
export function Res(): ParameterDecorator {
  return createNoopParameterDecorator('res')
}

/**
 * Overrides the response media type on a controller or a single action.
 *
 * @param value The response media type, for example `application/json`.
 * See {@link https://swagger.io/docs/specification/media-types/ Swagger media-type documentation}.
 */
export function Produces(value: string): MethodDecorator & ClassDecorator {
  return createNoopClassMethodDecorator('produces')
}
