import { YMInitializer } from 'react-yandex-metrika'

export function YandexMetrika() {
  return (
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
        type: 2,
        defer: false,
      }}
      version="2"
    />
  )
}
