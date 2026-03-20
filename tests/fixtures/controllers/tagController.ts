import { Route, Controller, Get, Query } from '@tsoa-next/runtime'

/**
 * @isLong
 */
export type NumType = number

@Route('TagTest')
export class TagController extends Controller {
  /**
   * @isInt index
   * @param {number} index
   */
  @Get()
  public async get(@Query() index: NumType, @Query() index2: number): Promise<void> {
    return
  }
}
