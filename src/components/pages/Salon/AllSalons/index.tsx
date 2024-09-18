import React, { FC, useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { MainContainer } from '../../../../styles/common'
import SearchBlock from '../../../blocks/SearchBlock'
import { CategoryImage, WrapBanner } from './styles'
import { WrapperResults } from '../../MainPage/components/SearchMain/styled'
import Line from '../../MainPage/components/Line'
import MobileViewCards from '../../MainPage/components/MobileViewCards'
import { MobileHidden } from '../../../../styles/common'
import { ISalon } from 'src/types/salon'
import { ITotalCount } from 'src/pages/[city]/salon'
import { ICity, IPagination } from 'src/types'
import { SalonsSearch } from '../../MainPage/components/SearchMain/SalonSearch'

export type IView = 'map' | 'list'

export interface ISalonsPageProps {
  salonData: ISalon[] | []
  totalCount: ITotalCount
  cityData: ICity
  pagination: IPagination
}

const AllSalonsPage: FC<ISalonsPageProps> = ({
  totalCount,
  salonData,
  pagination,
  cityData,
}) => {
  const [view, setView] = useState<IView>('list')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [view])

  return (
    <>
      <MobileViewCards totalCount={totalCount} />
      <MobileHidden>
        <SearchBlock title="Найти свой салон" />
      </MobileHidden>

      <CSSTransition
        in={view === 'list'}
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
          <SalonsSearch
            cityData={cityData}
            pagination={pagination}
            view={view}
            setView={setView}
            salonData={salonData}
          />
        </WrapperResults>
      </MainContainer>
    </>
  )
}

export default AllSalonsPage
