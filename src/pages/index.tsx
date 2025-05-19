import { GetServerSideProps } from 'next'
import { defaultValues } from 'src/api/authConfig'
import { FC } from 'react'
import MainHead from './MainHead'
import { Fragment } from 'react'

const AppContent: FC = () => {
  return (
    <Fragment>
      <MainHead
        title="MOI salon - платформа для салонов красоты и мастеров"
        description="MOI salon - инновационная платформа, соединяющая салоны красоты, мастеров и клиентов"
        image="/mobile-main-bg.jpg"
      />
    </Fragment>
  )
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
