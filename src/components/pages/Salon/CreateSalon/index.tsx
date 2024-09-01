import {
  useRef,
  useState,
  useCallback,
  useEffect,
  FC,
  useMemo,
  RefObject,
} from 'react'
import Header from '../../MainPage/components/Header'
import { MainContainer } from '../../../../styles/common'
import { Wrapper } from './styled'
import Controls from '../../../blocks/Form/Controls'
import RegistrationForm from './components/RegistrationForm'
import scrollIntoView from 'scroll-into-view'
import BackArrow from '../../../ui/BackArrow'
import { PHOTO_URL } from '../../../../api/variables'
import { getTabs } from './config'
import { ISalonPage } from 'src/types/salon'
import { ISetState } from 'src/types/common'
import { ICity, IPhoto } from 'src/types'
import { useMutation } from '@apollo/client'
import { UPDATE_SALON_PHOTO } from 'src/api/graphql/salon/mutations/updateSalonPhoto'
import { useElementVisibility } from './components/RegistrationForm/utils/useElementVisibility'
import { FormGuardPopup } from 'src/components/blocks/Form/FormGuardPopup'

export type IHandleClickNextTabInForm = (number: number) => void

interface Props {
  rent?: boolean
  salon: ISalonPage
  cities: ICity[]
}

const CreateSalon: FC<Props> = ({ salon, cities, rent = false }) => {
  const allTabs = useRef<HTMLFormElement>(null)
  const ref1 = useRef<HTMLDivElement>(null)
  const ref2 = useRef<HTMLDivElement>(null)
  const ref3 = useRef<HTMLDivElement>(null)
  const ref4 = useRef<HTMLDivElement>(null)
  const ref5 = useRef<HTMLDivElement>(null)
  const ref6 = useRef<HTMLDivElement>(null)

  const [refActive, setRefActive] = useState<string | boolean>(false)
  const [logo, setLogo] = useState<IPhoto | null>(salon?.logo || null)
  const [noPhotoError, setNoPhotoError] = useState<boolean>(false)
  const [dirtyForm, setDirtyForm] = useState(false)

  const tabs = useMemo(() => getTabs(salon), [salon])

  const { handleScroll, handleClick } = useElementVisibility(
    [
      { ref: ref1, setVisible: setRefActive.bind(null, '1') },
      { ref: ref2, setVisible: setRefActive.bind(null, '2') },
      { ref: ref3, setVisible: setRefActive.bind(null, '3') },
      { ref: ref4, setVisible: setRefActive.bind(null, '4') },
      { ref: ref5, setVisible: setRefActive.bind(null, '5') },
      { ref: ref6, setVisible: setRefActive.bind(null, '6') },
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
        <BackArrow link={'masterCabinet'} />
        <Wrapper>
          <Controls
            tabs={tabs}
            photoType={'salonPhoto'}
            refActive={refActive}
            setPhoto={setLogo}
            photo={logo ? { ...logo, url: `${PHOTO_URL}${logo?.url}` } : null}
            noPhotoError={noPhotoError}
            setNoPhotoError={setNoPhotoError}
            dirtyForm={dirtyForm}
          />
          <RegistrationForm
            cities={cities}
            allTabs={allTabs}
            rent={rent}
            handleClickNextTab={handleClick}
            ref1={ref1}
            ref2={ref2}
            ref3={ref3}
            ref4={ref4}
            ref5={ref5}
            ref6={ref6}
            salon={salon}
            noPhotoError={noPhotoError}
            logo={logo}
            setDirtyForm={setDirtyForm}
            dirtyForm={dirtyForm}
          />
        </Wrapper>
        <FormGuardPopup setDirtyForm={setDirtyForm} dirtyForm={dirtyForm} />
      </MainContainer>
    </>
  )
}

export default CreateSalon
