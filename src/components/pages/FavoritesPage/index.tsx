import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../styles/variables'
import BrandsFavorites from './BrandsFavorites'
import SalonsFavorites from './SalonsFavorites'
import MastersFavorites from './MastersFavorites'
import GoodsFavorites from './GoodsFavorites'
import EducationsFavorites from './EducationsFavorites'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { IUser, IUserThings } from 'src/types/me'

const Wrapper = styled.div`
  min-height: 70vh;
`

const Empty = styled.p`
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px 140px;
  font-size: 18px;
  line-height: 30px;
  text-align: center;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 40px 20px;
  }
`

const FavoritesPage = () => {
  const { user } = useAuthStore(getStoreData)
  let haveFavorites = false
  let keys = []

  useEffect(() => {
    if (user) {
      keys = (Object.keys(user?.favorite) as (keyof IUserThings)[]) || []

      haveFavorites = !!keys.find(key => user.favorite[key].length)
    } else {
      const favorites: { [K: string]: Array<any> } = JSON.parse(
        localStorage.getItem('favorites') || '',
      )
      keys =
        (Object.keys(favorites) as (keyof { [K: string]: Array<any> })[]) || []
      haveFavorites = !!keys.find(key => favorites[key].length)
    }
  }, [])

  return (
    <Wrapper>
      <MastersFavorites title="Избранные мастера" />
      <SalonsFavorites title="Избранные салоны" />
      <BrandsFavorites title="Избранные бренды" />
      <GoodsFavorites title="Избранные продукты" />
      <EducationsFavorites title="Избранные обучения" />
      {/* <AdvicesFavorites
        title="Избранные советы"
        setAdviceEmpty={setAdviceEmpty}
      /> */}
      {haveFavorites ? (
        <Empty>Вы еще ничего не добавили в избранное</Empty>
      ) : null}
    </Wrapper>
  )
}

export default FavoritesPage
