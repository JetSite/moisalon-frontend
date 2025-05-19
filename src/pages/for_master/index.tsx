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
    },
  }
}

export default ForMaster
