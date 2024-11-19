import { useRef, useState, useEffect, useCallback, FC, useMemo } from 'react'
import scrollIntoView from 'scroll-into-view'
import { MainContainer, MobileHidden } from '../../../../styles/common'
import Header from '../../MainPage/components/Header'
import { Wrapper } from './styled'
import Controls from '../../../blocks/Form/Controls'
import CabinetForm from './components/CabinetForm'
import CabinetHeaderMobile from '../../../blocks/Cabinet/components/CabinetHeaderMobile'
import { PHOTO_URL } from 'src/api/variables'
import { IBrand } from 'src/types/brands'
import { gtBrandCabinetTabs } from './config'
import { useElementVisibility } from '../../Salon/CreateSalon/components/RegistrationForm/utils/useElementVisibility'

export interface IBrandCabinetProps {
  brand: IBrand
}

const BrandCabinet: FC<IBrandCabinetProps> = ({ brand }) => {
  const allTabs = useRef<HTMLFormElement>(null)
  const ref1 = useRef<HTMLDivElement>(null)
  const ref2 = useRef<HTMLDivElement>(null)
  const ref3 = useRef<HTMLDivElement>(null)
  const ref4 = useRef<HTMLDivElement>(null)

  const tabs = useMemo(() => gtBrandCabinetTabs(brand), [brand])

  const [refActive, setRefActive] = useState<string | boolean>(false)

  const { handleScroll, handleClick } = useElementVisibility(
    [
      { ref: ref1, setVisible: setRefActive.bind(null, '1') },
      { ref: ref2, setVisible: setRefActive.bind(null, '2') },
      { ref: ref3, setVisible: setRefActive.bind(null, '1') },
      { ref: ref4, setVisible: setRefActive.bind(null, '2') },
    ],
    tabs,
  )

  useEffect(() => {
    handleScroll()
  }, [handleScroll])

  return (
    <>
      <Header />
      <MainContainer>
        <CabinetHeaderMobile category={brand} />
        <Wrapper>
          <MobileHidden>
            <Controls
              tabs={tabs}
              photoType={'brand'}
              refActive={refActive}
              noSetPhoto={true}
              photo={
                brand.logo ? { url: `${PHOTO_URL}${brand.logo.url}` } : null
              }
            />
          </MobileHidden>
          <CabinetForm
            setPhotosArray={() => {}}
            allTabs={allTabs}
            ref1={ref1}
            ref2={ref2}
            ref3={ref3}
            ref4={ref4}
            brand={brand}
            handleClickNextTab={handleClick}
          />
        </Wrapper>
      </MainContainer>
    </>
  )
}

export default BrandCabinet
