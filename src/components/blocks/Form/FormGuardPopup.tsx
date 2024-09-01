import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import Button from 'src/components/ui/Button'
import Popup from 'src/components/ui/Popup'
import { ISetState } from 'src/types/common'

interface Props {
  dirtyForm: boolean
  setDirtyForm: ISetState<boolean>
}

export const FormGuardPopup: FC<Props> = ({ dirtyForm, setDirtyForm }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [link, setLink] = useState<string | null>(null)

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      if (!target) return

      const linkElement =
        target.closest('a') || target.closest('[data-navigate]')

      if (!linkElement) return

      const href =
        linkElement.getAttribute('href') ||
        linkElement.getAttribute('data-navigate')

      if (href) {
        if (dirtyForm) {
          e.preventDefault()
          e.stopPropagation()
          setOpen(true)
          setLink(href)
        } else {
          router.push(href)
        }
      }
    }

    const handleRouteChange = (url: string) => {
      if (dirtyForm && link) {
        console.log('first')

        router.events.emit('routeChangeError')
        throw `Переход прерван на ${url}`
      }
    }

    document.addEventListener('click', handleLinkClick, true)
    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      document.removeEventListener('click', handleLinkClick, true)
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [dirtyForm, router])

  const handlePopupClose = () => {
    setOpen(false)
  }
  return (
    link && (
      <Popup
        isOpen={open}
        onClose={handlePopupClose}
        title="Вы прерываете заполнение профиля!"
        description=""
        content={() => {
          return <p>Вся несохраненная информация будет утеряна. Вы уверены?</p>
        }}
      >
        <Button
          onClick={() => {
            setDirtyForm(false)
            router.push(link)
          }}
          style={{ marginTop: 25 }}
          variant="gray"
        >
          Выйти
        </Button>
        <Button
          onClick={handlePopupClose}
          style={{ marginTop: 25 }}
          variant="red"
        >
          Остаться
        </Button>
      </Popup>
    )
  )
}
