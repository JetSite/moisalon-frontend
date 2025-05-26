import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import Script from 'next/script'
import createEmotionServer from '@emotion/server/create-instance'
import { createEmotionCache } from '../utils/createEmotionCache'
import React from 'react'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const styledComponentsSheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage
    const cache = createEmotionCache()
    const { extractCriticalToChunks } = createEmotionServer(cache)

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App =>
            function EnhanceApp(props) {
              return styledComponentsSheet.collectStyles(
                <App {...(props as any)} emotionCache={cache} />,
              )
            },
        })

      const initialProps = await Document.getInitialProps(ctx)
      const emotionStyles = extractCriticalToChunks(initialProps.html)
      const emotionStyleTags = emotionStyles.styles.map(style => (
        <style
          data-emotion={`${style.key} ${style.ids.join(' ')}`}
          key={style.key}
          dangerouslySetInnerHTML={{ __html: style.css }}
        />
      ))

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {styledComponentsSheet.getStyleElement()}
            {emotionStyleTags}
          </>
        ),
      }
    } finally {
      styledComponentsSheet.seal()
    }
  }
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,500,600,700,800,900&display=swap&subset=cyrillic,cyrillic-ext,latin-ext"
            rel="stylesheet"
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': 
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], 
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); 
})(window,document,'script','dataLayer','GTM-NNMCVPR')
          `,
            }}
          />
          <meta name="emotion-insertion-point" content="" />
          <link rel="dns-prefetch" href="https://mc.yandex.ru" />
          <link
            rel="preconnect"
            href="https://mc.yandex.ru"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="https://mc.yandex.ru/metrika/tag.js"
            as="script"
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <noscript>
            <div>
              <img
                src="https://mc.yandex.ru/watch/56585698"
                style={{ position: 'absolute', left: '-9999px' }}
                alt=""
              />
            </div>
          </noscript>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-NNMCVPR"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
