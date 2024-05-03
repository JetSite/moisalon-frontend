import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Wrapper,
  TopBlock,
  TopTitle,
  TopLink,
  Subtitle,
  MediumBlock,
  MediumTitle,
  WorkplacePreview,
  Name,
  EditButton,
  Price,
  AddButton,
  BottomBlock,
  BottomText,
  AddWorkplaceButton,
  BackLink,
} from './styles'
import { cyrToTranslit } from '../../../../../../../utils/translit'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

const Success = ({
  salon,
  seatSalon,
  setShowAdditionalInfo,
  setSuccess,
  setSeatSalon,
  setRoom,
  setRoomSeatId,
  resetRentalRate,
  roomSeatId,
  activitiesCatalog,
}) => {
  const router = useRouter()
  const { city } = useAuthStore(getStoreData)

  const seatActivity = activitiesCatalog.filter(
    activity => activity.id === seatSalon?.activities[0],
  )

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  const priceNumber = seatSalon?.rentalPricing?.hour
    ? seatSalon?.rentalPricing?.hour
    : seatSalon?.rentalPricing?.day
    ? seatSalon?.rentalPricing?.day
    : seatSalon?.rentalPricing?.week
    ? seatSalon?.rentalPricing?.week
    : seatSalon?.rentalPricing?.month
    ? seatSalon?.rentalPricing?.month
    : null
  const priceText = seatSalon?.rentalPricing?.hour
    ? 'час'
    : seatSalon?.rentalPricing?.day
    ? 'день'
    : seatSalon?.rentalPricing?.week
    ? 'нед.'
    : seatSalon?.rentalPricing?.month
    ? 'мес.'
    : null

  const addButtonHandler = () => {
    setSuccess(false)
    setShowAdditionalInfo(true)
  }

  const editButtonHandler = () => {
    setSuccess(false)
    setShowAdditionalInfo(false)
  }

  const addNewWorkplaceButtonHandler = () => {
    setSeatSalon(null)
    setRoom(null)
    setRoomSeatId(null)
    resetRentalRate()
    editButtonHandler()
  }

  const backHandler = () => {
    router.push('/masterCabinet')
  }

  return (
    <Wrapper>
      <TopBlock>
        <TopTitle>Рабочее место успешно опубликовано!</TopTitle>
        <Subtitle>
          Теперь мастера смогут отправлять вам заявки на аренду.
        </Subtitle>
        <Link
          href={`/${cyrToTranslit(salon?.address?.city || city)}/rent/${
            salon?.id
          }/room/${roomSeatId}/seat/${seatSalon?.id}`}
          passHref
        >
          <TopLink target="_blank">Просмотр на платформе</TopLink>
        </Link>
      </TopBlock>
      <MediumBlock>
        <MediumTitle>
          Посмотрите как ваше рабочее место выглядит на платформе
        </MediumTitle>
        <WorkplacePreview url={seatSalon?.photo?.url}>
          {seatActivity[0]?.title ? (
            <Name>{seatActivity[0]?.title}</Name>
          ) : null}
          <EditButton onClick={editButtonHandler}>
            Редактировать рабочее место в <br /> личном кабинете
          </EditButton>
          {priceNumber ? (
            <Price>
              {priceNumber} Р / {priceText}
            </Price>
          ) : null}
        </WorkplacePreview>
        <AddButton
          variant="red"
          size="noWidth"
          font="popUp"
          onClick={addButtonHandler}
        >
          Дополнить
        </AddButton>
      </MediumBlock>
      <BottomBlock>
        <AddWorkplaceButton
          variant="red"
          size="noWidth"
          font="popUp"
          onClick={addNewWorkplaceButtonHandler}
        >
          Добавить другое рабочее место
        </AddWorkplaceButton>
        <BottomText>
          Чтобы удалить, отредактировать или временно снять рабочее место с
          публикации, зайдите в личный кабинет
        </BottomText>
        <BackLink onClick={backHandler}>Вернуться в личный кабинет</BackLink>
      </BottomBlock>
    </Wrapper>
  )
}

export default Success
