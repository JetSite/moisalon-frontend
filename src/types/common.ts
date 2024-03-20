import { ReactElement } from 'react'

export type Nullable<T> = { [P in keyof T]: T[P] | null }

export type IChildren =
  | Array<ReactElement | boolean | string | null>
  | ReactElement
  | boolean
  | string
  | null
