import React, { Fragment } from 'react'
import MainLayout from '../../layouts/MainLayout'
import { MainContainer } from '../../styles/common'
import FavoritesPage from '../../components/pages/FavoritesPage'
import MainHead from '../MainHead'

const Favorites = () => {
  return (
    <Fragment>
      <MainHead
        title="Избранное | MOI salon"
        description="Ваши избранные салоны, мастера и услуги на платформе MOI salon"
        image="/master-landing-login.jpg"
      />
      <MainLayout>
        <MainContainer>
          <FavoritesPage />
        </MainContainer>
      </MainLayout>
    </Fragment>
  )
}

export default Favorites
