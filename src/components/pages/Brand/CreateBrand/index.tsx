import { useRef, useState, useCallback, useEffect, FC } from 'react'
import scrollIntoView from 'scroll-into-view'
import Header from '../../MainPage/components/Header'
import { MainContainer } from '../../../../styles/common'
import Controls from '../../../blocks/Form/Controls'
import BackArrow from '../../../ui/BackArrow'
import { Wrapper } from './styled'
import RegistrationForm from './components/RegistrationForm'
import { ICity, IPhoto } from 'src/types'
import { PHOTO_URL } from 'src/api/variables'
import { IBrand } from 'src/types/brands'
import { ISetState } from 'src/types/common'

export interface CreateBrandProps {
  brand: Partial<IBrand>
  cities: ICity[]
}

const CreateBrand: FC<CreateBrandProps> = ({ brand, cities }) => {
  const allTabs = useRef<HTMLFormElement>(null)
  const ref1 = useRef<HTMLDivElement>(null)
  const ref2 = useRef<HTMLDivElement>(null)

  const [tabs] = useState([
    { id: '1', value: 'Информация о бренде', anchor: 'about' },
    { id: '2', value: 'Дополнительная информация', anchor: 'socials' },
    {
      id: '3',
      value: 'Кабинет бренда',
      anchor: 'cabinet',
      href: '/brandCabinet',
      link: brand?.id,
    },
  ])

  const [refActive, setRefActive] = useState<string | boolean>(false)
  const [ref1Visible, setRef1Visible] = useState(true)
  const [ref2Visible, setRef2Visible] = useState(false)
  const [photoBrand, setPhotoBrand] = useState<IPhoto | null>(
    brand?.logo || null,
  )
  const [noPhotoError, setNoPhotoError] = useState(false)

  const handleElementPosition = (
    element: HTMLDivElement | null,
    func: ISetState<boolean>,
    top: number,
  ) => {
    if (!element) return

    const posTop = element.getBoundingClientRect().top
    const isVisible =
      posTop > 0
        ? window.innerHeight > posTop + top
        : element.clientHeight + posTop > window.innerHeight

    func(isVisible)
  }

  useEffect(() => {
    ref1Visible ? setRefActive('1') : ref2Visible ? setRefActive('2') : null
  }, [ref1Visible, ref2Visible])

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
    ]
    elements.forEach(el => handleElementPosition(el.el, el.func, el.top))
  }, [])

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [ref1Visible, ref2Visible])

  const handleClickNextTab = (number: number) => {
    const newTab = tabs.find(item => +item.id === number + 1)
    if (newTab) {
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
  }

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
            photo={photoBrand ? { url: `${PHOTO_URL}${photoBrand.url}` } : null}
            setPhoto={setPhotoBrand}
            noPhotoError={noPhotoError}
            setNoPhotoError={setNoPhotoError}
          />
          <RegistrationForm
            cities={cities}
            allTabs={allTabs}
            handleClickNextTab={handleClickNextTab}
            ref1={ref1}
            ref2={ref2}
            photoBrand={photoBrand}
            brand={brand}
            setNoPhotoError={setNoPhotoError}
          />
        </Wrapper>
      </MainContainer>
    </>
  )
}

export default CreateBrand
