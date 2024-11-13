import { IPagination } from 'src/types'

type IFlattenStrapiResponse = (
  data: StrapiDataObject | StrapiDataObject[] | AttributesObject | null,
) => any | null

type AttributesObject = {
  [key: string]: any
}

export type StrapiDataObject = {
  id: string | number
  attributes: AttributesObject
  data: StrapiDataObject | StrapiDataObject[] | null | AttributesObject
  meta?: { pagination: IPagination }
}

type IFlatten = (
  data: StrapiDataObject | StrapiDataObject[] | null,
) => AttributesObject | null

type IIsObject = (data: unknown) => boolean

const flatten: IFlatten = data => {
  if (!(data as StrapiDataObject).attributes) return data

  return {
    id: (data as StrapiDataObject).id,
    ...(data as StrapiDataObject).attributes,
  }
}

export const isObject: IIsObject = data =>
  Object.prototype.toString.call(data) === '[object Object]'
export const isArray: IIsObject = data =>
  Object.prototype.toString.call(data) === '[object Array]'

export const flattenStrapiResponse: IFlattenStrapiResponse = data => {
  if (!data) return null
  if (isArray(data)) {
    return (data as StrapiDataObject[]).map(item => flattenStrapiResponse(item))
  }
  if (isObject(data)) {
    if (isArray((data as StrapiDataObject).data)) {
      data = [...((data as StrapiDataObject).data as StrapiDataObject[])]
    } else if (isObject((data as StrapiDataObject).data)) {
      data = flatten({
        ...((data as StrapiDataObject).data as StrapiDataObject),
      })
    } else if ((data as StrapiDataObject).data === null) {
      data = null
    } else {
      data = flatten(data as StrapiDataObject)
    }

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const typedKey = key as keyof StrapiDataObject
        if (!key.includes('__')) {
          const typedData = data as AttributesObject
          typedData[typedKey] = flattenStrapiResponse(typedData[typedKey])
        }
      }
    }

    return data
  }

  return data
}
