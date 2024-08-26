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
import { IUserThings } from 'src/types/me'

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
  const [haveFavorites, setHaveFavorites] = useState(false)
  const [favorites, setFavorites] = useState<IUserThings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedFavorites = JSON.parse(
        localStorage.getItem('favorites') || '{}',
      )
      setFavorites(storedFavorites)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (favorites) {
      const keys = Object.keys(favorites) as (keyof IUserThings)[]
      setHaveFavorites(!!keys.find(key => favorites[key].length > 0))
    }
  }, [favorites])

  const handleDeleted = () => {
    const updatedFavorites = JSON.parse(
      localStorage.getItem('favorites') || '{}',
    )
    setFavorites(updatedFavorites)
  }

  if (loading) {
    return null // Или добавьте лоадер, если хотите
  }

  return (
    <Wrapper>
      {haveFavorites ? (
        <>
          <MastersFavorites
            handleDeleted={handleDeleted}
            title="Избранные мастера"
          />
          <SalonsFavorites
            handleDeleted={handleDeleted}
            title="Избранные салоны"
          />
          <BrandsFavorites
            handleDeleted={handleDeleted}
            title="Избранные бренды"
          />
          <GoodsFavorites
            handleDeleted={handleDeleted}
            title="Избранные продукты"
          />
          <EducationsFavorites
            handleDeleted={handleDeleted}
            title="Избранные обучения"
          />
        </>
      ) : (
        <Empty>Вы еще ничего не добавили в избранное</Empty>
      )}
    </Wrapper>
  )
}

export default FavoritesPage
