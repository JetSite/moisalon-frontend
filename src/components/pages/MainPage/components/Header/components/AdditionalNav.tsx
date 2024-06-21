import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useRef, FC, Dispatch, SetStateAction } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import Button from '../../../../../ui/Button'
import Popup from '../../../../../ui/Popup'
import { NavItem, AdditionalNavContent } from '../styled'
import { IMainPageHeaderLinks } from '../config'
import { ISetState } from 'src/types/common'

interface Props {
  isAboutPage: boolean
  showAdditionalNav: boolean
  setShowAdditionalNav: ISetState<boolean>
  links: IMainPageHeaderLinks[]
  catalog?: boolean
}

const AdditionalNav: FC<Props> = ({
  isAboutPage,
  showAdditionalNav,
  setShowAdditionalNav,
  links,
  catalog,
}) => {
  const router = useRouter()
  const addNavRef = useRef<HTMLDivElement>(null)
  const [openPopup, setOpenPopup] = useState(false)

  const closePopup = () => {
    setOpenPopup(false)
  }

  return (
    <>
      <OutsideClickHandler
        onOutsideClick={() => {
          setShowAdditionalNav(false)
        }}
      >
        <AdditionalNavContent
          catalog={catalog}
          ref={addNavRef}
          showAdditionalNav={showAdditionalNav}
        >
          {links.map((link, i) => (
            <NavItem
              key={i}
              active={router.pathname == link.link}
              isAboutPage={isAboutPage}
              // visible={link?.visible}
            >
              <Link href={link.link} target={link.target}>
                {link.title}
              </Link>
            </NavItem>
          ))}
        </AdditionalNavContent>
      </OutsideClickHandler>
      <Popup
        isOpen={openPopup}
        onClose={closePopup}
        title="Для перехода в B2B магазин, необходимо зарегистрировать профиль салона или мастера"
      >
        <Button style={{ marginTop: 20 }} onClick={closePopup} variant="red">
          Закрыть
        </Button>
      </Popup>
    </>
  )
}

export default AdditionalNav
