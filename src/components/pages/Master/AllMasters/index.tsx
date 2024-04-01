import { MainContainer } from '../../../../styles/common'
import MastersSearchResults from '../../MainPage/components/SearchMain/MastersSearchResults'
import SearchBlock from '../../../blocks/SearchBlock'
import Line from '../../MainPage/components/Line'
import MobileViewCards from '../../MainPage/components/MobileViewCards'
import { CategoryImage, WrapBanner } from './styles'
import { WrapperResults } from '../../MainPage/components/SearchMain/styled'
import { FC, useContext } from 'react'
import { SearchMainQueryContext } from '../../../../searchContext'
import { CSSTransition } from 'react-transition-group'
import { MobileHidden } from '../../../../styles/common'
import { IMaster } from 'src/types/masters'
import { ICity, IPagination } from 'src/types'

interface Props {
  masterData: IMaster[]
  totalBrands: number
  totalMasters: number
  totalSalons: number
  cityData?: ICity[]
  paginations: IPagination
}

const AllMastersPage: FC<Props> = ({
  masterData,
  totalBrands,
  totalMasters,
  totalSalons,
  cityData,
  paginations,
}) => {
  const [query] = useContext(SearchMainQueryContext)

  return (
    <>
      <MobileViewCards
        cityData={cityData}
        totalBrands={totalBrands}
        totalMasters={totalMasters}
        totalSalons={totalSalons}
      />
      <MobileHidden>
        <SearchBlock title="Найти своего мастера" />
      </MobileHidden>
      <CSSTransition
        in={!query?.query}
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
          <MastersSearchResults
            masterData={masterData}
            paginations={paginations}
          />
        </WrapperResults>
      </MainContainer>
    </>
  )
}

export default AllMastersPage
