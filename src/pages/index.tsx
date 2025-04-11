import { GetServerSideProps } from 'next'
import { defaultValues } from 'src/api/authConfig'
import { FC } from 'react'

const AppContent: FC = () => {
  return null
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const cityCookie = ctx.req.cookies['city']
  return {
    redirect: {
      destination: cityCookie || defaultValues.city.slug,
      permanent: true,
    },
  }
}

export default AppContent
