import { NextRouter } from 'next/router'

export const redirectCityRoutes = (citySlug: string, router: NextRouter) => {
  if (router.pathname === '/[city]/salon/[id]' && router?.query?.city) {
    router.push(`/${citySlug}/salon`)
    return
  }
  if (
    router.pathname === '/[city]/brand/[id]/products' &&
    router?.query?.city
  ) {
    router.push(`/${citySlug}/brand`)
    return
  }
  if (router.pathname === '/[city]/rent/[id]' && router?.query?.city) {
    router.push(`/${citySlug}/rent`)
    return
  }
  if (
    router.pathname === '/[city]/rent/[id]room/[roomId]/seat/[seatId]' &&
    router?.query?.city
  ) {
    router.push(`/${citySlug}/rent`)
    return
  }
  if (router.pathname === '/[city]/master/[id]' && router?.query?.city) {
    router.push(`/${citySlug}/master`)
    return
  }
  if (router.pathname === '/[city]/brand/[id]' && router?.query?.city) {
    router.push(`/${citySlug}/brand`)
    return
  }
  if (router?.query?.city) {
    router.replace({
      query: { ...router.query, city: citySlug },
    })
  }
}
