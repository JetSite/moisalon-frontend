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
import Head from 'next/head'

const progress = new ProgressBar({
  size: 2,
  color: red,
  className: 'bar-of-progress',
  delay: 100,
})

export interface IAppProps {
  user?: StrapiDataObject
  cityData?: ICity
  meta?: {
    title?: string
    description?: string
    image?: string
    url?: string
  }
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

  const meta = pageProps.meta || {
    title: 'MOI salon',
    description: 'MOI salon - платформа для салонов и мастеров',
    image: '/mobile-main-bg.jpg',
    url: 'https://moi.salon/',
  }

  const fullImageUrl = meta.image?.startsWith('http')
    ? meta.image
    : `https://moi.salon${meta.image}`

  return (
    <div style={{ overflowX: mobileMedia ? 'hidden' : undefined }}>
      <style global jsx>{`
        ${normalizeStyle}
      `}</style>
      <Head>
        <title>{meta.title}</title>
        <meta name="theme-color" content="#000000" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1"
        />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex, nofollow" />

        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={meta.url} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={fullImageUrl} />
        <meta property="og:site_name" content="MOI salon" />

        {/* Twitter Card data */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={fullImageUrl} />
      </Head>
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
