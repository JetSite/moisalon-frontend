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
    },
  }
}

export default ForSalon
