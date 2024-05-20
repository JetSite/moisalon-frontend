import { ApolloQueryResult } from '@apollo/client'
import { ServerResponse } from 'http'
import { authConfig } from '../authConfig'

export const checkErr = (
  data: ApolloQueryResult<any>[],
  router: ServerResponse,
) => {
  let authErr = false
  if (!data) {
    console.log('alert err in checkErr')
    return
  }
  if (data.length) {
    data.forEach(item =>
      item.errors?.forEach(err => {
        if (err.message === 'Forbidden access') {
          authErr = true
        }
      }),
    )
  }

  if (authErr) {
    router.setHeader('Set-Cookie', [
      `${authConfig.tokenKeyName}=delete; Max-Age=0; Path=/;`,
    ])

    router.writeHead(302, { Location: authConfig.notAuthLink })
    router.end()
  }
}
