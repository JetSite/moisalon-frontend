import { useState, useEffect } from 'react'
import { StylesProvider } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { ApolloProvider, useLazyQuery } from '@apollo/client'
import ProgressBar from '@badrap/bar-of-progress'
import globalStyle from '../styles/global'
import normalizeStyle from '../styles/normalize'
import { useApollo } from '../api/apollo-client'
import 'swiper/css'
import 'swiper/css/navigation'
import theme from '../theme'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'
import { YMInitializer } from 'react-yandex-metrika'
import { useMedia } from 'use-media'
import { red } from '../styles/variables'
import { AppProps } from 'next/app'
import { MainHead } from './MainHead'
import AuthProvider from 'src/api/AuthProvider'
import { IServerProps } from 'src/api/server/types'

const progress = new ProgressBar({
  size: 2,
  color: red,
  className: 'bar-of-progress',
  delay: 100,
})

function MyApp({ Component, pageProps }: AppProps<IServerProps>) {
  const mobileMedia = useMedia({ maxWidth: 768 })
  const apolloClient = useApollo<IServerProps>(pageProps)

  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageView(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode?.removeChild(jssStyles)
    }
  }, [])

  useEffect(() => {
    router.events.on('routeChangeStart', progress.start)
    router.events.on('routeChangeComplete', progress.finish)
    router.events.on('routeChangeError', progress.finish)
    return () => {
      router.events.off('routeChangeStart', progress.start)
      router.events.off('routeChangeComplete', progress.finish)
      router.events.off('routeChangeError', progress.finish)
    }
  }, [router.events])

  return (
    <div style={{ overflowX: mobileMedia ? 'hidden' : undefined }}>
      <MainHead />
      <style global jsx>{`
        ${globalStyle}
        ${normalizeStyle}
      `}</style>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <StylesProvider injectFirst>
            <AuthProvider serverData={pageProps}>
              <YMInitializer
                accounts={[56585698]}
                options={{ webvisor: true }}
                version="2"
              />
              <Component {...pageProps} />
            </AuthProvider>
          </StylesProvider>
        </ThemeProvider>
      </ApolloProvider>
    </div>
  )
}

export default MyApp
