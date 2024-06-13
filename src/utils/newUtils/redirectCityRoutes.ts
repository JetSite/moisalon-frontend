import { NextRouter } from 'next/router'

export const redirectCityRoutes = (slug: string, router: NextRouter) => {
  if (router.pathname === '/[city]/salon/[id]' && router?.query?.city) {
    router.push(`/${slug}/salon`)
    return
  }
  if (
    router.pathname === '/[city]/brand/[id]/products' &&
    router?.query?.city
  ) {
    router.push(`/${slug}/brand`)
    return
  }
  if (router.pathname === '/[city]/rent/[id]' && router?.query?.city) {
    router.push(`/${slug}/rent`)
    return
  }
  if (
    router.pathname === '/[city]/rent/[id]room/[roomId]/seat/[seatId]' &&
    router?.query?.city
  ) {
    router.push(`/${slug}/rent`)
    return
  }
  if (router.pathname === '/[city]/master/[id]' && router?.query?.city) {
    router.push(`/${slug}/master`)
    return
  }
  if (router.pathname === '/[city]/brand/[id]' && router?.query?.city) {
    router.push(`/${slug}/brand`)
    return
  }
  if (router?.query?.city) {
    router.replace({
      query: { ...router.query, city: slug },
    })
  }
}
