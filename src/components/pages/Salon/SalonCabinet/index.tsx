import { useRef, useState, useEffect, useCallback } from 'react'
import { MainContainer, MobileHidden } from '../../../../styles/common'
import Header from '../../MainPage/components/Header'
import Controls from '../../../blocks/Form/Controls'
import CabinetForm from './components/CabinetForm'
import { Wrapper } from './styles'
import CabinetHeaderMobile from '../../../blocks/Cabinet/components/CabinetHeaderMobile'
import { PHOTO_URL } from 'src/api/variables'

const SalonCabinet = ({ salonData }) => {
  const allTabs = useRef()
  const ref1 = useRef()
  const ref2 = useRef()
  const ref3 = useRef()

  const [tabs] = useState([
    { id: '1', value: 'Наши услуги', anchor: 'services' },
    { id: '2', value: 'Отзывы клиентов', anchor: 'reviews' },
    { id: '3', value: 'Наши профили', anchor: 'profiles' },
    {
      id: '4',
      value: 'Данные салона',
      anchor: 'cabinet',
      href: '/createSalon',
      link: salonData?.id,
      back: true,
    },
  ])

  const [refActive, setRefActive] = useState(false)
  const [ref1Visible, setRef1Visible] = useState(true)
  const [ref2Visible, setRef2Visible] = useState(false)
  const [ref3Visible, setRef3Visible] = useState(false)

  const handleElementPosition = (element, func, top) => {
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
      : null
  }, [ref1Visible, ref2Visible, ref3Visible])

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
    ]
    elements.forEach(el => handleElementPosition(el.el, el.func, el.top))
  }, [])

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [ref1Visible, ref2Visible, ref3Visible])

  return (
    <>
      <Header />
      <MainContainer>
        <CabinetHeaderMobile category={salonData} />
        <Wrapper>
          <MobileHidden>
            <Controls
              tabs={tabs}
              photoType={'salonData'}
              refActive={refActive}
              noSetPhoto={true}
              photo={
                salonData.logo
                  ? { ...salonData.logo, url: PHOTO_URL + salonData.logo.url }
                  : null
              }
            />
          </MobileHidden>
          <CabinetForm
            allTabs={allTabs}
            ref1={ref1}
            ref2={ref2}
            ref3={ref3}
            salonData={salonData}
            salonId={salonData?.id}
          />
        </Wrapper>
      </MainContainer>
    </>
  )
}

export default SalonCabinet
