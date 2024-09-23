type ICheckType = (data: unknown) => boolean

export const isObject: ICheckType = data =>
  Object.prototype.toString.call(data) === '[object Object]'
export const isArray: ICheckType = data =>
  Object.prototype.toString.call(data) === '[object Array]'
