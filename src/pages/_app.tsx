import { useEffect } from 'react'
import { StylesProvider } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { ApolloProvider } from '@apollo/client'
import ProgressBar from '@badrap/bar-of-progress'
import '@/styles/global.css'
import normalizeStyle from '../styles/normalize'
import { useApollo } from '../api/apollo-client'
import 'swiper/css'
import 'swiper/css/navigation'
import theme from '../theme'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'
import { useMedia } from 'use-media'
import { red } from '../styles/variables'
import { AppProps } from 'next/app'
import AuthProvider from 'src/api/AuthProvider'
import { StrapiDataObject } from 'src/utils/flattenStrapiResponse'
import { ICity } from 'src/types'

const progress = new ProgressBar({
  size: 2,
  color: red,
  className: 'bar-of-progress',
  delay: 100,
})

export interface IAppProps {
  user?: StrapiDataObject
  cityData?: ICity
}

function MyApp({ Component, pageProps }: AppProps<IAppProps>) {
  const mobileMedia = useMedia({ maxWidth: 768 })
  const apolloClient = useApollo({ props: pageProps })
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
      <style global jsx>{`
        ${normalizeStyle}
      `}</style>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <StylesProvider injectFirst>
            <AuthProvider pageProps={pageProps}>
              {/* <YMInitializer
                accounts={[56585698]}
                options={{ webvisor: true }}
                version="2"
              /> */}
              <Component {...pageProps} />
            </AuthProvider>
          </StylesProvider>
        </ThemeProvider>
      </ApolloProvider>
    </div>
  )
}

export default MyApp
