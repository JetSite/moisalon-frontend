import Head from 'next/head'
import Script from 'next/script'
import React from 'react'

export const MainHead = () => {
  return (
    <>
      <Head>
        <title>MOI salon</title>
        <meta name="theme-color" content="#000000" />
        <meta name="yandex-verification" content="e5eb15699df5a43e" />
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
    </>
  )
}
