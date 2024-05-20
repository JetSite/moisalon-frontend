import React, { FC } from 'react'
import { MainContainer } from '../../../../styles/common'
import BrandsSearchResults from '../../MainPage/components/SearchMain/BrandsSearchResults'
import SearchBlock from '../../../blocks/SearchBlock'
import Line from '../../MainPage/components/Line'
import MobileViewCards from '../../MainPage/components/MobileViewCards'
import { CategoryImage, WrapBanner } from './styles'
import { WrapperResults } from '../../MainPage/components/SearchMain/styled'
import { CSSTransition } from 'react-transition-group'
import { MobileHidden } from '../../../../styles/common'
import { ISalon } from 'src/types/salon'
import { ITotalCount } from 'src/pages/[city]/salon'
import { ICity, IPagination } from 'src/types'
import { IBrand } from 'src/types/brands'

export interface IBrandPageProps {
  brandData: IBrand[] | []
  totalCount: ITotalCount
  cityData: ICity
  pagination: IPagination | null
}

const AllBrandsPage: FC<IBrandPageProps> = ({
  totalCount,
  brandData,
  pagination,
  cityData,
}) => {
  return (
    <>
      <MobileViewCards totalCount={totalCount} />
      <MobileHidden>
        <SearchBlock title="Найти свой бренд" />
      </MobileHidden>
      {brandData.length ? (
        <>
          <CSSTransition
            in={true}
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
              <BrandsSearchResults
                pagination={pagination}
                cityData={cityData}
                brandData={brandData}
              />
            </WrapperResults>
          </MainContainer>
        </>
      ) : null}
    </>
  )
}

export default AllBrandsPage
