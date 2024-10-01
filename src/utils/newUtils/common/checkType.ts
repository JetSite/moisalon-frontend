type IIsObject = (data: unknown) => boolean

export const isObject: IIsObject = data =>
  Object.prototype.toString.call(data) === '[object Object]'
export const isArray: IIsObject = data =>
  Object.prototype.toString.call(data) === '[object Array]'
