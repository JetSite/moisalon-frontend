import { FC } from 'react'
import NotFound from '../components/pages/404'
import MainLayout from 'src/layouts/MainLayout'
import { GetStaticProps } from 'next'

const Custom404: FC = () => {
  return (
    <MainLayout>
      <NotFound />
    </MainLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      meta: {
        title: 'Страница не найдена | MOI salon',
        description: 'Запрашиваемая страница не найдена на платформе MOI salon',
        image: '/mobile-main-bg.jpg',
        url: 'https://moi.salon/404',
      },
      schema: {
        type: 'WebPage',
        data: {
          '@type': 'WebPage',
          name: 'Страница не найдена | MOI salon',
          description:
            'Запрашиваемая страница не найдена на платформе MOI salon',
          url: 'https://moi.salon/404',
          image: 'https://moi.salon/mobile-main-bg.jpg',
          publisher: {
            '@type': 'Organization',
            name: 'MOI salon',
            url: 'https://moi.salon',
          },
        },
      },
    },
  }
}

export default Custom404
