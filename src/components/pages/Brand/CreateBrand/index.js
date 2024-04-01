import { useRef, useState, useCallback, useEffect } from 'react'
import scrollIntoView from 'scroll-into-view'
import Header from '../../../pages/MainPage/components/Header'
import { MainContainer } from '../../../../styles/common'
import Controls from '../../../blocks/Form/Controls'
import RegistrationForm from './components/RegistrationForm'
import BackArrow from '../../../ui/BackArrow'
import { Wrapper } from './styled'
import { PHOTO_URL } from '../../../../variables'

const CreateBrand = ({ onAdd, loading, brand }) => {
  const allTabs = useRef()
  const ref1 = useRef()
  const ref2 = useRef()

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

  const [refActive, setRefActive] = useState(false)
  const [ref1Visible, setRef1Visible] = useState(true)
  const [ref2Visible, setRef2Visible] = useState(false)
  const [photoBrandId, setPhotoId] = useState(null)
  const [noPhotoError, setNoPhotoError] = useState(false)

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

  const handleClickNextTab = number => {
    const newTab = tabs.find(item => +item.id === number + 1)
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
      <Header loading={loading} />
      <MainContainer>
        <BackArrow link={`brandCabinet?id=${brand?.id}`} />
        <Wrapper>
          <Controls
            tabs={tabs}
            photoType={'brandPhoto'}
            refActive={refActive}
            photo={
              photoBrandId
                ? {
                    url: `${PHOTO_URL}${photoBrandId}/original`,
                  }
                : brand?.logoId
                ? {
                    url: `${PHOTO_URL}${brand?.logoId}/original`,
                  }
                : null
            }
            id={null}
            onAdd={onAdd}
            setPhotoId={setPhotoId}
            noPhotoError={noPhotoError}
            setNoPhotoError={setNoPhotoError}
          />
          <RegistrationForm
            allTabs={allTabs}
            handleClickNextTab={handleClickNextTab}
            ref1={ref1}
            ref2={ref2}
            photoBrandId={photoBrandId}
            brand={brand}
            setNoPhotoError={setNoPhotoError}
          />
        </Wrapper>
      </MainContainer>
    </>
  )
}

export default CreateBrand
