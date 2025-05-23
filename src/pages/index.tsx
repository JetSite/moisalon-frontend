import { GetServerSideProps } from 'next'
import { defaultValues } from 'src/api/authConfig'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getCookie } from 'cookies-next'

export default function Index() {
  const router = useRouter()

  useEffect(() => {
    const cityCookie = getCookie('city')
    const destination = cityCookie || defaultValues.city.slug
    router.replace(`/${destination}`, undefined, { shallow: true })
  }, [])

  return null
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  ctx.res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400',
  )

  ctx.res.setHeader('Vary', 'Cookie')

  const cityCookie = ctx.req.cookies['city']
  const destination = cityCookie || defaultValues.city.slug

  return {
    redirect: {
      destination: `/${destination}`,
      permanent: true,
    },
  }
}
