import React, { useState, useEffect, FC } from 'react'
import { CSSTransition } from 'react-transition-group'
import { MainContainer } from '../../../../styles/common'
import SalonsSearchResults from '../../MainPage/components/SearchMain/SalonsSearchResults'
import SearchBlock from '../../../blocks/SearchBlock'
import { WrapBanner } from './styles'
import { WrapperResults } from '../../MainPage/components/SearchMain/styled'
import MobileViewCards from '../../MainPage/components/MobileViewCards'
import { MobileHidden } from '../../../../styles/common'
import Banner from './components/Banner'
import { ISalon } from 'src/types/salon'
import { ITotalCount } from 'src/pages/[city]/salon'
import { ICity, IPagination } from 'src/types'
import { IView } from '../../Salon/AllSalons'

export interface IRentsPageProps {
  rentData: ISalon[] | []
  totalCount: ITotalCount
  cityData: ICity
  pagination: IPagination | null
}

const AllRentPage: FC<IRentsPageProps> = ({
  totalCount,
  rentData,
  pagination,
  cityData,
}) => {
  const [view, setView] = useState<IView>('list')
  const [filterOpen, setFilterOpen] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [view])

  return (
    <>
      <MobileViewCards totalCount={totalCount} />
      <MobileHidden>
        <SearchBlock title="Найти свой салон" />
      </MobileHidden>
      {rentData.length ? (
        <>
          <MobileHidden>
            <CSSTransition
              in={view === 'list' || filterOpen}
              timeout={500}
              classNames="banner"
              unmountOnExit
            >
              <WrapBanner>
                <Banner />
              </WrapBanner>
            </CSSTransition>
          </MobileHidden>
          <MainContainer>
            <WrapperResults>
              <SalonsSearchResults
                rent
                cityData={cityData}
                pagination={pagination}
                view={view}
                setView={setView}
                salonData={rentData}
              />
            </WrapperResults>
          </MainContainer>
        </>
      ) : null}
    </>
  )
}

export default AllRentPage