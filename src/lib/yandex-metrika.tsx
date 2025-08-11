import { YMInitializer } from 'react-yandex-metrika'

export function YandexMetrika() {
  return (
    <YMInitializer
      accounts={[103667977]}
      options={{
        ssr: true,
        webvisor: true,
        clickmap: true,
        ecommerce: 'dataLayer',
        accurateTrackBounce: true,
        trackLinks: true,
      }}
      version="2"
    />
  )
}
