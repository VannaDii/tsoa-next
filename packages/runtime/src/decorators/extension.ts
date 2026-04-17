/**
 * Adds an OpenAPI specification extension to a model property.
 *
 * @param name The extension key, typically beginning with `x-`.
 * @param value The extension value.
 */
export function Extension(name: string, value: ExtensionType | ExtensionType[]): PropertyDecorator {
  return () => {
    return
  }
}

/** Value types supported by OpenAPI specification extensions. */
export type ExtensionType = string | number | boolean | null | ExtensionType[] | { [name: string]: ExtensionType | ExtensionType[] }
