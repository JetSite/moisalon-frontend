import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { CREATE_RENTAL_REQUEST } from 'src/api/graphql/rentalRequest/mutations/createRentalRequest'
import WritePopup from 'src/components/pages/Salon/ViewSalon/components/WritePopup.js'
import Button from 'src/components/ui/Button'
import Popup from 'src/components/ui/Popup'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { IChildren } from 'src/types/common'
import { ISalon } from 'src/types/salon'
import { ISalonWorkplace } from 'src/types/workplace'
import styled from 'styled-components'
import scrollIntoView from 'scroll-into-view'

interface Props {
  children: IChildren
  salon: ISalon
  workplace?: ISalonWorkplace
}

export const ButtonWrapper = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  display: block;
  font-size: inherit;
  background: inherit;
  line-height: inherit;
  font-family: inherit;
  color: inherit;
  font-weight: inherit;
`

export const OnlineBookingButton: FC<Props> = ({
  children,
  workplace,
  salon,
}) => {
  const router = useRouter()
  const [open, setOpen] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const { user } = useAuthStore(getStoreData)
  const [createRequest] = useMutation(CREATE_RENTAL_REQUEST, {
    onCompleted: data => {
      setOpen(false)
      setSuccess(true)
      // router.push('/master/Cabinet')
    },
  })
  const onSubmit = (values: { [K: string]: string }) => {
    const input = {
      title: 'Хочу арендовать у вас ' + (workplace?.title || 'рабочее место'),
      comment: values.message,
      publishedAt: new Date().toISOString(),
      user: user?.info.id,
      salon: salon.id,
      workplace: workplace?.id,
      status: '1',
      // type: workplace?.workspaces_types[0].id,
      contacts: `${
        values.name + ', телефон: ' + values.phone + ', почта: ' + values.email
      }`,
    }
    createRequest({ variables: { input } })
  }
  const handleCloseWritePopup = () => {
    setOpen(false)
  }

  const closeSuccessPopup = () => {
    setSuccess(false)
  }

  const onOpen = () => {
    if (router.asPath.includes('/rent/')) {
      const element = document.getElementById('rent')
      element &&
        scrollIntoView(element, {
          time: 500,
          align: {
            top: 0,
            topOffset: 100,
          },
        })
      return
    }
    if (!workplace) {
      router.push(`/${router.query.city}/rent/${salon.id}`)
    } else {
      setOpen(true)
    }
  }
  return (
    <>
      <ButtonWrapper onClick={onOpen}>{children}</ButtonWrapper>
      <>
        <WritePopup
          user={user}
          open={open}
          handleClose={handleCloseWritePopup}
          onSubmit={onSubmit}
        />
        <Popup
          isOpen={success}
          onClose={closeSuccessPopup}
          title="Ваше сообщение отправлено"
          description={`Администратор салона свяжется с вами в ближайшее время!`}
        >
          <Button
            style={{ marginTop: 20 }}
            onClick={closeSuccessPopup}
            variant="red"
          >
            Закрыть
          </Button>
        </Popup>
      </>
    </>
  )
}
