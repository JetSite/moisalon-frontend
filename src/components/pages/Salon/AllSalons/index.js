import React, { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { MainContainer } from '../../../../styles/common'
import SalonsSearchResults from '../../../pages/MainPage/components/SearchMain/SalonsSearchResults'
import SearchBlock from '../../../blocks/SearchBlock'
import { CategoryImage, WrapBanner } from './styles'
import { WrapperResults } from '../../../pages/MainPage/components/SearchMain/styled'
import Line from '../../../pages/MainPage/components/Line'
import MobileViewCards from '../../../pages/MainPage/components/MobileViewCards'
import { MobileHidden } from '../../../../styles/common'

const AllSalonsPage = ({
  salonSearch,
  totalBrands,
  totalMasters,
  totalSalons,
  me,
}) => {
  const query = { query: '' } //TODO: query
  const [view, setView] = useState('list')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [view])

  return (
    <>
      <MobileViewCards
        totalBrands={totalBrands}
        totalMasters={totalMasters}
        totalSalons={totalSalons}
      />
      <MobileHidden>
        <SearchBlock title="Найти свой салон" />
      </MobileHidden>
      <CSSTransition
        in={!query?.query && view === 'list'}
        timeout={500}
        classNames="banner"
        unmountOnExit
      >
        <WrapBanner>
          <Line text="Вы – профессионал? Присоединяйтесь, чтобы воспользоваться привилегиями." />
          <CategoryImage />
        </WrapBanner>
      </CSSTransition>
      <MainContainer>
        <WrapperResults>
          <SalonsSearchResults
            view={view}
            setView={setView}
            salonSearch={salonSearch}
            me={me}
          />
        </WrapperResults>
      </MainContainer>
    </>
  )
}

export default AllSalonsPage
