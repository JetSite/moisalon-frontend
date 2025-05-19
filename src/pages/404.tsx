import { FC } from 'react'
import NotFound from '../components/pages/404'
import MainLayout from 'src/layouts/MainLayout'

const Custom404: FC = () => {
  return (
    <MainLayout noMobileFooter>
      <NotFound />
    </MainLayout>
  )
}

export const getStaticProps = () => {
  return {
    props: {
      meta: {
        title: '404 - Страница не найдена | MOI salon',
        description:
          'К сожалению, запрашиваемая страница не найдена на платформе MOI salon',
        image: '/mobile-main-bg.jpg',
        url: 'https://moi.salon/404',
      },
    },
  }
}

export default Custom404
