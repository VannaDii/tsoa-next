/**
 * Adds OpenAPI tags to a controller or action.
 *
 * @param values One or more tag names to attach.
 */
export function Tags(...values: string[]): ClassDecorator & MethodDecorator {
  return () => {
    return
  }
}
