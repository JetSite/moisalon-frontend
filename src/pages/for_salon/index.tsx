import React, { Fragment } from 'react'
import SalonLanding from '../../components/pages/SalonLanding'

const ForSalon = () => {
  return (
    <Fragment>
      <SalonLanding />
    </Fragment>
  )
}

export const getStaticProps = () => {
  return {
    props: {
      meta: {
        title: 'Для салонов | MOI salon',
        description:
          'MOI salon - платформа для салонов красоты. Автоматизируйте бизнес, привлекайте клиентов и развивайте свой салон',
        image: '/salons-page-bg.jpg',
        url: 'https://moi.salon/for_salon',
      },
      schema: {
        type: 'WebPage',
        data: {
          name: 'Для салонов | MOI salon',
          description:
            'MOI salon - платформа для салонов красоты. Автоматизируйте бизнес, привлекайте клиентов и развивайте свой салон',
          url: 'https://moi.salon/for_salon',
          image: 'https://moi.salon/salons-page-bg.jpg',
          publisher: {
            '@type': 'Organization',
            name: 'MOI salon',
            url: 'https://moi.salon',
          },
          mainEntity: {
            '@type': 'Service',
            name: 'Платформа для салонов красоты',
            description:
              'Автоматизируйте бизнес, привлекайте клиентов и развивайте свой салон на платформе MOI salon',
            provider: {
              '@type': 'Organization',
              name: 'MOI salon',
              url: 'https://moi.salon',
            },
            audience: {
              '@type': 'Audience',
              audienceType: 'Beauty Salons',
            },
          },
        },
      },
    },
  }
}

export default ForSalon
