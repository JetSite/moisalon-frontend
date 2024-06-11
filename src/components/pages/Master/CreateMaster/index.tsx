import { useRef, useState, useCallback, useEffect, FC } from 'react'
import scrollIntoView from 'scroll-into-view'
import Header from '../../MainPage/components/Header'
import { MainContainer } from '../../../../styles/common'
import Controls from '../../../blocks/Form/Controls'
import { Wrapper } from './styled'
import BackArrow from '../../../ui/BackArrow'
import { PHOTO_URL } from '../../../../api/variables'
import RegistrationForm from './components/RegistrationForm'
import { IMaster } from 'src/types/masters'
import { IServiceCategories } from 'src/types/services'
import {
  IHandleClickNextTabInForm,
  IHandleElementPosition,
} from '../../Salon/CreateSalon'
import { useMutation } from '@apollo/client'
import { UPDATE_MASTER_PHOTO } from 'src/_graphql-legacy/master/updateMasterPhotoMutation'
import { ICity, IPhone, IPhoto } from 'src/types'

interface Props {
  master: IMaster | null
  serviceCategories: IServiceCategories[]
  cities: ICity[]
}

const CreateMaster: FC<Props> = ({ master, serviceCategories, cities }) => {
  const allTabs = useRef<HTMLFormElement>(null)
  const ref1 = useRef<HTMLDivElement>(null)
  const ref2 = useRef<HTMLDivElement>(null)
  const ref3 = useRef<HTMLDivElement>(null)
  const ref4 = useRef<HTMLDivElement>(null)

  const [tabs] = useState([
    { id: '1', value: 'Личная информация', anchor: 'about' },
    { id: '2', value: 'Специализация', anchor: 'spec' },
    { id: '3', value: 'Профессиональная информация', anchor: 'profInfo' },
    { id: '4', value: 'Дополнительная информация', anchor: 'socials' },
  ])

  const [refActive, setRefActive] = useState<string | boolean>(false)
  const [ref1Visible, setRef1Visible] = useState<string | boolean>(true)
  const [ref2Visible, setRef2Visible] = useState<string | boolean>(false)
  const [ref3Visible, setRef3Visible] = useState<string | boolean>(false)
  const [ref4Visible, setRef4Visible] = useState<string | boolean>(false)
  const [photo, setPhoto] = useState<IPhoto | null>(master?.photo || null)
  const [noPhotoError, setNoPhotoError] = useState<boolean>(false)

  const [updateMasterPhoto] = useMutation(UPDATE_MASTER_PHOTO)
  const onAdd = useCallback(
    (photoUrl: string) => {
      if (master) {
        updateMasterPhoto({ variables: { input: { photoUrl } } })
      }
    },
    [updateMasterPhoto],
  )

  useEffect(() => {
    if (master?.photo) {
      setPhoto(master?.photo)
    }
  }, [master])

  const handleElementPosition: IHandleElementPosition = (
    element,
    func,
    top,
  ) => {
    if (!element) return
    const posTop = element?.getBoundingClientRect()?.top
    if (
      posTop > 0
        ? window?.innerHeight > posTop + top
        : element?.clientHeight + posTop > window?.innerHeight
    ) {
      func(true)
    } else func(false)
  }

  useEffect(() => {
    ref1Visible
      ? setRefActive('1')
      : ref2Visible
      ? setRefActive('2')
      : ref3Visible
      ? setRefActive('3')
      : ref4Visible
      ? setRefActive('4')
      : null
  }, [ref1Visible, ref2Visible, ref3Visible, ref4Visible])

  const handleScroll = useCallback(() => {
    const elements = [
      {
        el: ref1?.current,
        func: setRef1Visible,
        top: 0,
      },
      {
        el: ref2?.current,
        func: setRef2Visible,
        top: 0,
      },
      {
        el: ref3?.current,
        func: setRef3Visible,
        top: 600,
      },
      {
        el: ref4?.current,
        func: setRef4Visible,
        top: 600,
      },
    ]
    elements.forEach(el => handleElementPosition(el.el, el.func, el.top))
  }, [])

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [ref1Visible, ref2Visible, ref3Visible, ref4Visible])

  const handleClickNextTab: IHandleClickNextTabInForm = number => {
    const newTab = tabs.find(item => +item.id === number + 1) || tabs[0]
    const element = document.getElementById(newTab.anchor.replace('#', ''))
    if (element) {
      scrollIntoView(element, {
        time: 500,
        align: {
          top: 0,
          topOffset: 0,
        },
      })
    }
  }
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
            id={master?.id || null}
            onAdd={onAdd}
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
          />
        </Wrapper>
      </MainContainer>
    </>
  )
}

export default CreateMaster
