import { useRef, useState, useCallback, useEffect, FC, useMemo } from 'react'
import scrollIntoView from 'scroll-into-view'
import Header from '../../MainPage/components/Header'
import { MainContainer } from '../../../../styles/common'
import Controls from '../../../blocks/Form/Controls'
import BackArrow from '../../../ui/BackArrow'
import { Wrapper } from './styled'
import RegistrationForm from './components/RegistrationForm'
import { ICity, ICountry, IPhoto, ISNetwork } from 'src/types'
import { PHOTO_URL } from 'src/api/variables'
import { IBrand } from 'src/types/brands'
import { ISetState } from 'src/types/common'
import { gtBrandTabs } from './config'
import { useElementVisibility } from '../../Salon/CreateSalon/components/RegistrationForm/utils/useElementVisibility'
import { FormGuardPopup } from 'src/components/blocks/Form/FormGuardPopup'

export interface CreateBrandProps {
  brand: IBrand | null
  cities: ICity[]
  countries: ICountry[]
  sNetworks: ISNetwork[]
}

const CreateBrand: FC<CreateBrandProps> = ({
  brand,
  cities,
  countries,
  sNetworks,
}) => {
  const allTabs = useRef<HTMLFormElement>(null)
  const ref1 = useRef<HTMLDivElement>(null)
  const ref2 = useRef<HTMLDivElement>(null)
  const [dirtyForm, setDirtyForm] = useState(false)

  const tabs = useMemo(() => gtBrandTabs(brand), [brand])

  const [refActive, setRefActive] = useState<string | boolean>(false)
  const [logo, setLogo] = useState<IPhoto | null>(brand?.logo || null)
  const [noPhotoError, setNoPhotoError] = useState(false)

  const { handleScroll, handleClick } = useElementVisibility(
    [
      { ref: ref1, setVisible: setRefActive.bind(null, '1') },
      { ref: ref2, setVisible: setRefActive.bind(null, '2') },
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
        <BackArrow link={`brandCabinet?id=${brand?.id}`} />
        <Wrapper>
          <Controls
            tabs={tabs}
            photoType={'brandPhoto'}
            refActive={refActive}
            photo={logo ? { url: `${PHOTO_URL}${logo.url}` } : null}
            setPhoto={setLogo}
            noPhotoError={noPhotoError}
            setNoPhotoError={setNoPhotoError}
          />
          <RegistrationForm
            cities={cities}
            countries={countries}
            allTabs={allTabs}
            handleClickNextTab={handleClick}
            ref1={ref1}
            ref2={ref2}
            logo={logo}
            brand={brand}
            setNoPhotoError={setNoPhotoError}
            setDirtyForm={setDirtyForm}
            dirtyForm={dirtyForm}
            sNetworks={sNetworks}
          />
        </Wrapper>
        <FormGuardPopup setDirtyForm={setDirtyForm} dirtyForm={dirtyForm} />
      </MainContainer>
    </>
  )
}

export default CreateBrand
