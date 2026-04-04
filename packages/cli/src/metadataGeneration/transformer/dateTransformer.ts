import type { Node } from 'typescript'
import { Tsoa } from '@tsoa-next/runtime'

import { Transformer } from './transformer'
import { getJSDocTagNames } from '../../utils/jsDocUtils'

export class DateTransformer extends Transformer {
  public transform(parentNode?: Node): Tsoa.DateType | Tsoa.DateTimeType {
    if (!parentNode) {
      return { dataType: 'datetime' }
    }
    const tag = getJSDocTagNames(parentNode).find(name => ['isDate', 'isDateTime'].includes(name))

    if (!tag) {
      return { dataType: 'datetime' }
    }
    switch (tag) {
      case 'isDate':
        return { dataType: 'date' }
      case 'isDateTime':
        return { dataType: 'datetime' }
      default:
        return { dataType: 'datetime' }
    }
  }
}
