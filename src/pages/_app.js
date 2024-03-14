import { useState, useEffect } from 'react'
import Head from 'next/head'
import { StylesProvider } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { ApolloProvider, useLazyQuery } from '@apollo/client'
import ProgressBar from '@badrap/bar-of-progress'
import globalStyle from '../../styles/global'
import normalizeStyle from '../../styles/normalize'
import { useApollo } from '../apollo-client'
import 'swiper/css'
import 'swiper/css/navigation'
import { currentUserSalonsAndMasterQuery } from '../_graphql-legacy/master/currentUserSalonsAndMasterQuery'
import {
  CartContext,
  MainSearchQuery,
  MeContext,
  SearchMainQueryContext,
  CategoryPageQueryContext,
  ProductsContext,
  ProductsGetStatusContext,
  CatalogsContext,
  CityContext,
} from '../searchContext'
import theme from '../theme'
import { useRouter } from 'next/router'
import Script from 'next/script'
import * as gtag from '../lib/gtag'
import { YMInitializer } from 'react-yandex-metrika'
import { catalogsQuery } from '../_graphql-legacy/catalogsQuery'
import { useMedia } from 'use-media'
import { red } from '../../styles/variables'
import { ChatProvider } from '../chatContext'
import { HistoryProvider } from '../historyContext'
import { cyrToTranslit } from '../utils/translit'
import { useCitySuggestions } from '../components/pages/MainPage/components/CitySelect/useCitySuggestions'
import { SearchHistoryProvider } from '../searchHistoryContext'

const progress = new ProgressBar({
  size: 2,
  color: red,
  className: 'bar-of-progress',
  delay: 100,
})

const AppContainer = ({ Component, pageProps }) => {
  // const router = useRouter();
  const [getInfo, { data }] = useLazyQuery(currentUserSalonsAndMasterQuery)
  // const [getCatalogs, { data: catalogsData }] = useLazyQuery(catalogsQuery);
  const [meInfo, setMeInfo] = useState({})
  const [catalogs, setCatalogs] = useState([])
  const productsState = useState([])
  const cartQuantityState = useState(0)
  const me = useState(null)
  const productsGetStatus = useState(false)
  const cityContext = useState('')

  // useEffect(() => {
  //   if (data?.me) {
  //     setMeInfo({
  //       info: data?.me?.info,
  //       master: data?.me?.master,
  //       locationByIp: data?.locationByIp,
  //       salons: data?.me?.salons,
  //       rentalRequests: data?.me?.rentalRequests,
  //     });
  //   } else {
  //     getInfo();
  //   }
  // }, [data]);

  // useEffect(() => {
  //   if (catalogsData) {
  //     setCatalogs(catalogsData);
  //   } else {
  //     getCatalogs();
  //   }
  // }, [catalogsData]);

  const queryMainState = useState({
    ...MainSearchQuery,
    city: meInfo?.info?.city
      ? meInfo.info.city
      : data?.locationByIp
      ? data?.locationByIp?.data?.city
      : 'Москва',
  })

  const queryCategoryPageState = useState({
    query: '',
  })

  // useEffect(() => {
  //   router.events.on("routeChangeStart", progress.start);
  //   router.events.on("routeChangeComplete", progress.finish);
  //   router.events.on("routeChangeError", progress.finish);
  //   return () => {
  //     router.events.off("routeChangeStart", progress.start);
  //     router.events.off("routeChangeComplete", progress.finish);
  //     router.events.off("routeChangeError", progress.finish);
  //   };
  // }, [router.events]);

  return (
    <MeContext.Provider value={me}>
      <HistoryProvider>
        <SearchHistoryProvider>
          <CatalogsContext.Provider value={catalogs}>
            <ProductsContext.Provider value={productsState}>
              <ProductsGetStatusContext.Provider value={productsGetStatus}>
                <SearchMainQueryContext.Provider value={queryMainState}>
                  <CategoryPageQueryContext.Provider
                    value={queryCategoryPageState}
                  >
                    <CartContext.Provider value={cartQuantityState}>
                      <CityContext.Provider value={cityContext}>
                        <ChatProvider>
                          <YMInitializer
                            accounts={[56585698]}
                            options={{ webvisor: true }}
                            version="2"
                          />
                          <Component {...pageProps} />
                        </ChatProvider>
                      </CityContext.Provider>
                    </CartContext.Provider>
                  </CategoryPageQueryContext.Provider>
                </SearchMainQueryContext.Provider>
              </ProductsGetStatusContext.Provider>
            </ProductsContext.Provider>
          </CatalogsContext.Provider>
        </SearchHistoryProvider>
      </HistoryProvider>
    </MeContext.Provider>
  )
}

function MyApp({ Component, pageProps }) {
  const mobileMedia = useMedia({ maxWidth: 768 })
  const apolloClient = useApollo(pageProps)
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = url => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }, [])

  return (
    <div style={{ overflowX: mobileMedia ? 'hidden' : null }}>
      <Head>
        <title>MOI salon</title>
        <meta name="theme-color" content="#000000" />
        <meta name="yandex-verification" content="e5eb15699df5a43e" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1"
        />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=GTM-NNMCVPR`}
      />
      <Script
        id="ya-metrika"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(m, e, t, r, i, k, a) {
            m[i] =
              m[i] ||
              function() {
                (m[i].a = m[i].a || []).push(arguments);
              };
            m[i].l = 1 * new Date();
            (k = e.createElement(t)),
              (a = e.getElementsByTagName(t)[0]),
              (k.async = 1),
              (k.src = r),
              a.parentNode.insertBefore(k, a);
          })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
          ym(56585698, "init", {
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true,
            ecommerce:"dataLayer"
          });
          `,
        }}
      />

      <style global jsx>{`
        ${globalStyle}
        ${normalizeStyle}
      `}</style>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <StylesProvider injectFirst>
            <AppContainer Component={Component} pageProps={pageProps} />
          </StylesProvider>
        </ThemeProvider>
      </ApolloProvider>
    </div>
  )
}

export default MyApp
