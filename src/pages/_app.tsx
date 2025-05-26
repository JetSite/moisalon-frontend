import { useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { ApolloProvider } from '@apollo/client'
import ProgressBar from '@badrap/bar-of-progress'
import '@/styles/global.css'
import normalizeStyle from '../styles/normalize'
import { useApollo } from '../api/apollo-client'
import 'swiper/css'
import 'swiper/css/navigation'
import theme from '../theme'
import { useRouter } from 'next/router'
import { useMedia } from 'use-media'
import { red } from '../styles/variables'
import { AppProps } from 'next/app'
import AuthProvider from 'src/api/AuthProvider'
import { StrapiDataObject } from 'src/utils/flattenStrapiResponse'
import { ICity } from 'src/types'
import Head from 'next/head'
import { StyledEngineProvider } from '@mui/material'
import { CacheProvider } from '@emotion/react'
import { createEmotionCache } from '../utils/createEmotionCache'
import { EmotionCache } from '@emotion/cache'
import { YMInitializer } from 'react-yandex-metrika'
import { trackPageView } from '../utils/analytics'

const clientSideEmotionCache = createEmotionCache()

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
  schema?: {
    type: string
    data: Record<string, any>
  }
}

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppProps & { emotionCache?: EmotionCache }) {
  const mobileMedia = useMedia({ maxWidth: 768 })
  const apolloClient = useApollo({ props: pageProps })
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      trackPageView(url)
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

  const fullImageUrl = `${process.env.NEXT_PUBLIC_PHOTO_URL}${meta.image}`

  const schemaData = pageProps.schema
    ? {
        '@context': 'https://schema.org',
        '@type': pageProps.schema.type,
        ...pageProps.schema.data,
      }
    : null

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

        <meta property="og:type" content="website" />
        <meta property="og:url" content={meta.url} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={fullImageUrl} />
        <meta property="og:site_name" content="MOI salon" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:logo" content="/logo.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={fullImageUrl} />

        {schemaData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
          />
        )}
      </Head>
      <CacheProvider value={emotionCache}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <ApolloProvider client={apolloClient}>
              <AuthProvider pageProps={pageProps}>
                <YMInitializer
                  accounts={[56585698]}
                  options={{
                    clickmap: false,
                    trackLinks: true,
                    accurateTrackBounce: false,
                    webvisor: false,
                    triggerEvent: true,
                    ecommerce: false,
                    childIframe: false,
                  }}
                  version="2"
                />
                <Component {...pageProps} />
              </AuthProvider>
            </ApolloProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </CacheProvider>
    </div>
  )
}

declare global {
  interface Window {
    ym: (counterId: number, action: string, url: string) => void
  }
}

export default MyApp
