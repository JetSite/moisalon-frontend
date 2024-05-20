import { GetServerSideProps } from 'next'
import { authConfig, defaultValues } from 'src/api/authConfig'
import { FC } from 'react'
import { getCookie } from 'cookies-next'
import { ICity } from 'src/types'

const AppContent: FC = () => {
  return null
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const cityCookie = ctx.req.cookies['city']
  return {
    redirect: {
      destination: cityCookie || defaultValues.citySlug,
      permanent: true,
    },
  }
}

export default AppContent
