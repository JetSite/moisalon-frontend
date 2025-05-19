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
    props: {
      meta: {
        title: 'MOI salon - платформа для салонов красоты и мастеров',
        description:
          'MOI salon - инновационная платформа, соединяющая салоны красоты, мастеров и клиентов',
        image: '/mobile-main-bg.jpg',
        url: 'https://moi.salon',
      },
    },
  }
}

export default AppContent
