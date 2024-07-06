import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { MainContainer } from '../../styles/common'
import FavoritesPage from '../../components/pages/FavoritesPage'

const Favorites = () => {
  return (
    <MainLayout>
      <MainContainer>
        <FavoritesPage />
      </MainContainer>
    </MainLayout>
  )
}

export default Favorites
