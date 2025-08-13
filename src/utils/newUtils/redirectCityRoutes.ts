import { NextRouter } from 'next/router'

export const redirectCityRoutes = (slug: string, router: NextRouter) => {
  if (router.query['city'] === slug) {
    return
  }

  const newPath = `/${slug}`

  const specialRoutes: Record<string, string> = {
    '/[city]/salon/[id]': '/salon',
    '/[city]/brand/[id]/products': '/brand',
    '/[city]/brand/[id]': '/brand',
    '/[city]/rent/[id]': '/rent',
    '/[city]/rent/[id]room/[roomId]/seat/[seatId]': '/rent',
    '/[city]/master/[id]': '/master',
  }

  if (specialRoutes[router.pathname]) {
    router.push(`${newPath}${specialRoutes[router.pathname]}`)
    return
  }

  if (router.query['city']) {
    router.replace(
      {
        ...router,
        query: { ...router.query, city: slug },
      },
      undefined,
    )
  } else {
    router.replace(newPath)
  }
}
