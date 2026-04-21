---
lastUpdated: 2026-04-20T21:59:41.311Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SuccessResponse

# المهمة: النجاح في الاستجابة

```ts
function SuccessResponse<HeaderType>(
   name, 
   description?, 
   produces?): MethodDecorator;
```

محددة في: [packages/runtime/src/decorators/response.ts:12](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/response.ts#L12)

تعلن حالة الاستجابة الناجحة، والوصف، وأنواع وسائط الإعلام بالنسبة لعملية ما.

## البارامترات النوعية

### HeaderType

`HeaderType` * النفقات* 
  \| `object`
  \| `"Header names must be of type string"`
  \| `"Header values must be string or string[]"` = `object`

## البارامترات

### name

`string` \| `number`

The HTTP status code returned when the operation succeededs.

### description?

`string`

وصف الرد الوارد في الوثيقة OpenAPI الوثيقة.

### produces?

`string` \| `string`[]

The response media type or media types.

## العودة

`MethodDecorator`
