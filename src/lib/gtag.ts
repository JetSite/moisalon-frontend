export type IPageView = (url: string) => void

export const pageView: IPageView = url => {
  ;(window as any).dataLayer.push({
    event: 'pageview',
    page: url,
  })
}
