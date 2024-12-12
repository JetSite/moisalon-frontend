import { useRef, useState, useCallback, useEffect, FC } from 'react'
import Header from '../../MainPage/components/Header'
import { MainContainer } from '../../../../styles/common'
import Controls from '../../../blocks/Form/Controls'
import { Wrapper } from './styled'
import BackArrow from '../../../ui/BackArrow'
import { PHOTO_URL } from '../../../../api/variables'
import RegistrationForm from './components/RegistrationForm'
import { IMaster } from 'src/types/masters'
import { IServiceCategories } from 'src/types/services'
import { useMutation } from '@apollo/client'
import { ICity, IPhone, IPhoto, ISNetwork } from 'src/types'
import { useElementVisibility } from '../../Salon/CreateSalon/components/RegistrationForm/utils/useElementVisibility'
import { ITab } from '../../Salon/CreateSalon/config'
import { useRouter } from 'next/router'
import { FormGuardPopup } from 'src/components/blocks/Form/FormGuardPopup'

interface Props {
  master: IMaster | null
  serviceCategories: IServiceCategories[]
  cities: ICity[]
  sNetworks: ISNetwork[]
}

const tabs: ITab[] = [
  { id: '1', value: 'Личная информация', anchor: 'about' },
  { id: '2', value: 'Специализация', anchor: 'spec' },
  { id: '3', value: 'Профессиональная информация', anchor: 'profInfo' },
  { id: '4', value: 'Дополнительная информация', anchor: 'socials' },
]

const CreateMaster: FC<Props> = ({
  master,
  serviceCategories,
  cities,
  sNetworks,
}) => {
  const allTabs = useRef<HTMLFormElement>(null)
  const ref1 = useRef<HTMLDivElement>(null)
  const ref2 = useRef<HTMLDivElement>(null)
  const ref3 = useRef<HTMLDivElement>(null)
  const ref4 = useRef<HTMLDivElement>(null)

  const [refActive, setRefActive] = useState<string | boolean>(false)
  const [photo, setPhoto] = useState<IPhoto | null>(master?.photo || null)
  const [noPhotoError, setNoPhotoError] = useState<boolean>(false)
  const [dirtyForm, setDirtyForm] = useState(false)

  // const [updateMasterPhoto] = useMutation(UPDATE_MASTER_PHOTO)
  // const onAdd = useCallback(
  //   (photoUrl: string) => {
  //     // if (master) {
  //     //   updateMasterPhoto({ variables: { input: { photoUrl } } })
  //     // }
  //   },
  //   [updateMasterPhoto],
  // )

  useEffect(() => {
    if (master?.photo) {
      setPhoto(master?.photo)
    }
  }, [master])

  const {
    handleScroll: handleElementVisibility,
    handleClick: handleClickNextTab,
  } = useElementVisibility(
    [
      { ref: ref1, setVisible: setRefActive.bind(null, '1') },
      { ref: ref2, setVisible: setRefActive.bind(null, '2') },
      { ref: ref3, setVisible: setRefActive.bind(null, '3') },
      { ref: ref4, setVisible: setRefActive.bind(null, '4') },
    ],
    tabs,
  )

  useEffect(() => {
    handleElementVisibility()
  }, [handleElementVisibility])

  return (
    <>
      <Header />
      <MainContainer>
        <BackArrow link="masterCabinet" />
        <Wrapper>
          <Controls
            tabs={tabs}
            photoType={'master'}
            refActive={refActive}
            photo={photo ? { ...photo, url: `${PHOTO_URL}${photo.url}` } : null}
            setPhoto={setPhoto}
            noPhotoError={noPhotoError}
            setNoPhotoError={setNoPhotoError}
          />
          <RegistrationForm
            allTabs={allTabs}
            handleClickNextTab={handleClickNextTab}
            ref1={ref1}
            ref2={ref2}
            ref3={ref3}
            ref4={ref4}
            master={master}
            photo={photo}
            setNoPhotoError={setNoPhotoError}
            serviceCategories={serviceCategories}
            cities={cities}
            dirtyForm={dirtyForm}
            setDirtyForm={setDirtyForm}
            sNetworks={sNetworks}
          />
        </Wrapper>
        <FormGuardPopup setDirtyForm={setDirtyForm} dirtyForm={dirtyForm} />
      </MainContainer>
    </>
  )
}

export default CreateMaster
