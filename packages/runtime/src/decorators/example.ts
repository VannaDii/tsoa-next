/**
 * Attaches an example value to a model property.
 *
 * @param exampleModel The example value to include in generated schema metadata.
 * @param exampleLabel Optional label used when multiple examples are present.
 */
export function Example<T>(exampleModel: T, exampleLabel?: string): PropertyDecorator {
  return () => {
    return
  }
}
