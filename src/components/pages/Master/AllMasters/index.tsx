import { MainContainer } from '../../../../styles/common'
import MastersSearchResults from '../../MainPage/components/SearchMain/MastersSearchResults'
import SearchBlock from '../../../blocks/SearchBlock'
import Line from '../../MainPage/components/Line'
import MobileViewCards from '../../MainPage/components/MobileViewCards'
import { CategoryImage, WrapBanner } from './styles'
import { WrapperResults } from '../../MainPage/components/SearchMain/styled'
import { FC } from 'react'
import { CSSTransition } from 'react-transition-group'
import { MobileHidden } from '../../../../styles/common'
import { IMaster } from 'src/types/masters'
import { ICity, IPagination } from 'src/types'
import { ITotalCount } from 'src/pages/[city]/salon'
import NotFound from '../../404'

export interface IMastersPageProps {
  masterData: IMaster[] | []
  totalCount: ITotalCount
  cityData: ICity
  pagination: IPagination | null
}

const AllMastersPage: FC<IMastersPageProps> = ({
  masterData,
  totalCount,
  cityData,
  pagination,
}) => {
  return (
    <>
      <MobileViewCards totalCount={totalCount} />
      <MobileHidden>
        <SearchBlock title="Найти своего мастера" />
      </MobileHidden>

      <CSSTransition in={true} timeout={500} classNames="banner" unmountOnExit>
        <WrapBanner>
          <Line text="Вы – профессионал? Присоединяйтесь, чтобы воспользоваться привилегиями." />
          <CategoryImage />
        </WrapBanner>
      </CSSTransition>
      <MainContainer>
        <WrapperResults>
          <MastersSearchResults
            cityData={cityData}
            masterData={masterData}
            pagination={pagination}
          />
        </WrapperResults>
      </MainContainer>
    </>
  )
}

export default AllMastersPage
