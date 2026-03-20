import { Controller, Get, Route } from '@tsoa-next/runtime'
import type { TestModel } from '../testModel.js'

@Route()
export class RootController extends Controller {
  @Get()
  public async rootHandler(): Promise<TestModel> {
    return {
      str: 'str',
    }
  }
}
