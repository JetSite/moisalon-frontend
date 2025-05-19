import Head from 'next/head'
import Script from 'next/script'
import React from 'react'

interface MainHeadProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

const MainHead: React.FC<MainHeadProps> = ({
  title = 'MOI salon',
  description = 'MOI salon - платформа для салонов и мастеров',
  image = '/mobile-main-bg.jpg',
  url = 'https://moi.salon/',
}) => {
  const fullImageUrl = image.startsWith('http')
    ? image
    : `https://moi.salon${image}`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="theme-color" content="#000000" />
        {/* <meta name="yandex-verification" content="e5eb15699df5a43e" /> */}
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
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={fullImageUrl} />
        <meta property="og:site_name" content="MOI salon" />

        {/* Twitter Card data */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={fullImageUrl} />
      </Head>
      {/* <Script
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
      /> */}
    </>
  )
}

export default MainHead
