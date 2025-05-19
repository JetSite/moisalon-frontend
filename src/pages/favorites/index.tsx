import React, { Fragment } from 'react'
import FavoritesPage from '../../components/pages/FavoritesPage'

const Favorites = () => {
  return (
    <Fragment>
      <FavoritesPage />
    </Fragment>
  )
}

export const getStaticProps = () => {
  return {
    props: {
      meta: {
        title: 'Избранное | MOI salon',
        description:
          'Ваши избранные салоны, мастера и услуги на платформе MOI salon',
        image: '/mobile-main-bg.jpg',
        url: 'https://moi.salon/favorites',
      },
    },
  }
}

export default Favorites
