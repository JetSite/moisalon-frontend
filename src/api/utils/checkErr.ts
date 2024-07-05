import { ApolloQueryResult } from '@apollo/client'
import { ServerResponse } from 'http'
import { authConfig } from '../authConfig'

export const checkErr = (
  data: ApolloQueryResult<any>[] | ApolloQueryResult<any> | null,
  router: ServerResponse,
) => {
  let authErr = false
  let returnNotErr = false
  if (!data) {
    console.log('alert err in checkErr')
    return
  }

  if (Array.isArray(data) && data.length) {
    data.forEach(item => {
      if (item.errors) {
        item.errors.forEach(err => {
          if (err.message === 'Forbidden access') {
            authErr = true
          }
        })
      } else {
        returnNotErr = true
        return
      }
    })
  } else {
    if ((data as ApolloQueryResult<any>)?.errors) {
      ;(data as ApolloQueryResult<any>)?.errors?.forEach(err => {
        if (err.message === 'Forbidden access') {
          authErr = true
          return
        }
      })
    } else {
      returnNotErr = true
    }
  }

  if (returnNotErr) return

  if (authErr) {
    router.setHeader('Set-Cookie', [
      `${authConfig.tokenKeyName}=delete; Max-Age=0; Path=/;`,
    ])
    router.writeHead(302, { Location: authConfig.notAuthLink })
    router.end()
    return
  } else {
    router.writeHead(302, { Location: '/404' })
    router.end()
    return
  }
}
