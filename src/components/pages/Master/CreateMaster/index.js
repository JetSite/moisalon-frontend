import { useRef, useState, useCallback, useEffect } from 'react'
import scrollIntoView from 'scroll-into-view'
import Header from '../../../pages/MainPage/components/Header'
import { MainContainer } from '../../../../styles/common'
import Controls from '../../../blocks/Form/Controls'
import RegistrationForm from './components/RegistrationForm'
import { Wrapper } from './styled'
import BackArrow from '../../../ui/BackArrow'
import { PHOTO_URL } from '../../../../variables'

const CreateMaster = ({ onAdd, master }) => {
  const allTabs = useRef()
  const ref1 = useRef()
  const ref2 = useRef()
  const ref3 = useRef()
  const ref4 = useRef()

  const [tabs] = useState([
    { id: '1', value: 'Личная информация', anchor: 'about' },
    { id: '2', value: 'Специализация', anchor: 'spec' },
    { id: '3', value: 'Профессиональная информация', anchor: 'profInfo' },
    { id: '4', value: 'Дополнительная информация', anchor: 'socials' },
  ])

  const [refActive, setRefActive] = useState(false)
  const [ref1Visible, setRef1Visible] = useState(true)
  const [ref2Visible, setRef2Visible] = useState(false)
  const [ref3Visible, setRef3Visible] = useState(false)
  const [ref4Visible, setRef4Visible] = useState(false)
  const [photoMasterId, setPhotoId] = useState(master?.photo?.id)
  const [noPhotoError, setNoPhotoError] = useState(false)

  useEffect(() => {
    if (master?.photo?.id) {
      setPhotoId(master?.photo?.id)
    }
  }, [master])

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

  const handleClickNextTab = number => {
    const newTab = tabs.find(item => +item.id === number + 1)
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
            photo={
              photoMasterId
                ? {
                    url: `${PHOTO_URL}${photoMasterId}/original`,
                  }
                : master?.photo
                ? master?.photo
                : null
            }
            id={master?.id}
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
            ref3={ref3}
            ref4={ref4}
            master={master}
            photoMasterId={photoMasterId}
            setNoPhotoError={setNoPhotoError}
          />
        </Wrapper>
      </MainContainer>
    </>
  )
}

export default CreateMaster
