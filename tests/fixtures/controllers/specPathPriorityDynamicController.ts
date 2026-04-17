import { Controller, Get, Path, Route } from 'tsoa-next'

@Route('{tenant}')
export class SpecPathPriorityDynamicController extends Controller {
  @Get('{resource}')
  public async getDynamicRouteMatch(@Path() tenant: string, @Path() resource: string) {
    return {
      matched: 'dynamic',
      resource,
      tenant,
    }
  }
}
