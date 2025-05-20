import React, { Fragment } from 'react'
import MasterLanding from 'src/components/pages/MasterLanding'

const ForMaster = () => {
  return (
    <Fragment>
      <MasterLanding />
    </Fragment>
  )
}

export const getStaticProps = () => {
  return {
    props: {
      meta: {
        title: 'Для мастеров | MOI salon',
        description:
          'MOI salon - платформа для мастеров красоты. Развивайте свои навыки, находите клиентов и продвигайте услуги',
        image: '/masters-page-right.png',
        url: 'https://moi.salon/for_master',
      },
      schema: {
        type: 'WebPage',
        data: {
          name: 'Для мастеров | MOI salon',
          description:
            'MOI salon - платформа для мастеров красоты. Развивайте свои навыки, находите клиентов и продвигайте услуги',
          url: 'https://moi.salon/for_master',
          image: 'https://moi.salon/masters-page-right.png',
          publisher: {
            '@type': 'Organization',
            name: 'MOI salon',
            url: 'https://moi.salon',
          },
          mainEntity: {
            '@type': 'Service',
            name: 'Платформа для мастеров красоты',
            description:
              'Развивайте свои навыки, находите клиентов и продвигайте услуги на платформе MOI salon',
            provider: {
              '@type': 'Organization',
              name: 'MOI salon',
              url: 'https://moi.salon',
            },
            audience: {
              '@type': 'Audience',
              audienceType: 'Beauty Professionals',
            },
          },
        },
      },
    },
  }
}

export default ForMaster
