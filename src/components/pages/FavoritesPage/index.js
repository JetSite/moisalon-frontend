import { useState } from 'react'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../styles/variables'
import BrandsFavorites from './BrandsFavorites'
import SalonsFavorites from './SalonsFavorites'
import MastersFavorites from './MastersFavorites/index.tsx'
import GoodsFavorites from './GoodsFavorites'
import EducationsFavorites from './EducationsFavorites'

const Wrapper = styled.div`
  min-height: 70vh;
`

const Empty = styled.div`
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
  const [, setMasterEmpty] = useState()
  const [, setSalonEmpty] = useState()
  const [, setBrandEmpty] = useState()
  const [, setProductEmpty] = useState()
  const [, setEducationsEmpty] = useState()

  let isFavoriteEmpty
  if (typeof window !== 'undefined') {
    const favorites = JSON.parse(localStorage.getItem('favorites'))
    isFavoriteEmpty =
      !favorites?.brands?.length &&
      !favorites?.masters?.length &&
      !favorites?.salons?.length &&
      !favorites?.products?.length &&
      !favorites?.educations?.length
    // !favorites?.advices?.length;
  }

  return (
    <Wrapper>
      <MastersFavorites
        title="Избранные мастера"
        setMasterEmpty={setMasterEmpty}
      />
      <SalonsFavorites title="Избранные салоны" setSalonEmpty={setSalonEmpty} />
      <BrandsFavorites title="Избранные бренды" setBrandEmpty={setBrandEmpty} />
      <GoodsFavorites
        title="Избранные продукты"
        setProductEmpty={setProductEmpty}
      />
      <EducationsFavorites
        title="Избранные обучения"
        setEducationsEmpty={setEducationsEmpty}
      />
      {/* <AdvicesFavorites
        title="Избранные советы"
        setAdviceEmpty={setAdviceEmpty}
      /> */}
      {isFavoriteEmpty ? (
        <Empty>Вы еще ничего не добавили в избранное</Empty>
      ) : null}
    </Wrapper>
  )
}

export default FavoritesPage
