import {
  useRef,
  useState,
  useCallback,
  useEffect,
  RefAttributes,
  RefObject,
  FC,
  LegacyRef,
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
import { ISalon, ISalonPage } from 'src/types/salon'
import { IID, ISetState } from 'src/types/common'
import { getDadataAddress } from 'src/api/dadata/getAddress'
import { ICity, IPhoto } from 'src/types'
import { useMutation } from '@apollo/client'
import { UPDATE_SALON_PHOTO } from 'src/api/graphql/salon/mutations/updateSalonPhoto'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

export type IHandleClickNextTabInForm = (number: number) => void

export type IHandleElementPosition = (
  element: HTMLDivElement | null,
  func: ISetState<string | boolean>,
  top: number,
) => void

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

  const [refActive, setRefActive] = useState<boolean | string>(false)
  const [ref1Visible, setRef1Visible] = useState<boolean | string>(true)
  const [ref2Visible, setRef2Visible] = useState<boolean | string>(false)
  const [ref3Visible, setRef3Visible] = useState<boolean | string>(false)
  const [ref4Visible, setRef4Visible] = useState<boolean | string>(false)
  const [ref5Visible, setRef5Visible] = useState<boolean | string>(false)
  const [ref6Visible, setRef6Visible] = useState<boolean | string>(false)
  const [noPhotoError, setNoPhotoError] = useState<boolean>(false)
  const [logo, setLogo] = useState<IPhoto | null>(
    salon?.logo ? salon?.logo : null,
  )

  const [updateSalonePhoto] = useMutation(UPDATE_SALON_PHOTO)
  const onAdd = useCallback(
    (photo: string) => {
      if (salon) {
        updateSalonePhoto({
          variables: { id: salon.id, input: { logo: photo } },
        })
      }
    },
    [updateSalonePhoto],
  )

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
        top: 0,
      },
      {
        el: ref4?.current,
        func: setRef4Visible,
        top: 0,
      },
      {
        el: ref5?.current,
        func: setRef5Visible,
        top: 0,
      },
      {
        el: ref6?.current,
        func: setRef6Visible,
        top: 0,
      },
    ]
    elements.forEach(el => handleElementPosition(el.el, el.func, el.top))
  }, [])

  useEffect(() => {
    ref1Visible
      ? setRefActive('1')
      : ref2Visible
      ? setRefActive('2')
      : ref3Visible
      ? setRefActive('3')
      : ref4Visible
      ? setRefActive('4')
      : ref5Visible
      ? setRefActive('5')
      : ref6Visible
      ? setRefActive('6')
      : null
  }, [
    ref1Visible,
    ref2Visible,
    ref3Visible,
    ref4Visible,
    ref5Visible,
    ref6Visible,
  ])

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [
    ref1Visible,
    ref2Visible,
    ref3Visible,
    ref4Visible,
    ref5Visible,
    ref6Visible,
  ])

  const handleClickNextTab: IHandleClickNextTabInForm = number => {
    const tabs = getTabs(salon)
    const newTab = tabs.find(item => +item?.id === number + 1) || tabs[0]
    const element = document.getElementById(newTab.anchor.replace('#', ''))
    if (element) {
      scrollIntoView(element, {
        time: 500,
        align: {
          top: 0,
          topOffset: 100,
        },
      })
    }
  }

  return (
    <>
      <Header />
      <MainContainer>
        <BackArrow
          link={rent ? `rentSalonSeat?id=${salon?.id}` : 'masterCabinet'}
        />
        <Wrapper>
          <Controls
            tabs={getTabs(salon)}
            photoType={'salonPhoto'}
            refActive={refActive}
            setPhoto={setLogo}
            photo={logo ? { ...logo, url: `${PHOTO_URL}${logo?.url}` } : null}
            onAdd={onAdd}
            noPhotoError={noPhotoError}
            setNoPhotoError={setNoPhotoError}
          />
          <RegistrationForm
            cities={cities}
            allTabs={allTabs}
            rent={rent}
            handleClickNextTab={handleClickNextTab}
            ref1={ref1}
            ref2={ref2}
            ref3={ref3}
            ref4={ref4}
            ref5={ref5}
            ref6={ref6}
            salon={salon}
            setNoPhotoError={setNoPhotoError}
            logo={logo}
          />
        </Wrapper>
      </MainContainer>
    </>
  )
}

export default CreateSalon
