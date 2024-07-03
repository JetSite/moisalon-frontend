import { FC, useEffect } from 'react'
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
import { ISalonPage } from 'src/types/salon'
import { ISalonWorkplace } from 'src/types/workplace'
import { IID, ISetState } from 'src/types/common'
import { PHOTO_URL } from 'src/api/variables'

interface Props {
  salon: ISalonPage
  resetRentalRate: () => void
  workplace: ISalonWorkplace | null
  setWorkplace: ISetState<ISalonWorkplace | null>
  setSuccess: ISetState<boolean>
  setShowAdditionalInfo: ISetState<boolean>
  setWorkplaceId: ISetState<string | null>
  workplaceId: string | null
}

const Success: FC<Props> = ({
  salon,
  workplace,
  setShowAdditionalInfo,
  setSuccess,
  setWorkplace,
  setWorkplaceId,
  resetRentalRate,
  workplaceId,
}) => {
  const router = useRouter()
  const { city } = useAuthStore(getStoreData)

  const seatActivity = salon.services.map(e => e.service)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  const rentalPeriod = workplace?.rentalPeriod.find(e => e.rentalCost)

  const addButtonHandler = () => {
    setSuccess(false)
    setShowAdditionalInfo(true)
  }

  const editButtonHandler = () => {
    setSuccess(false)
    setShowAdditionalInfo(false)
  }

  const addNewWorkplaceButtonHandler = () => {
    setWorkplace(null)
    setWorkplaceId(null)
    resetRentalRate()
    editButtonHandler()
    setSuccess(false)
  }

  const backHandler = () => {
    router.push('/masterCabinet')
  }

  return (
    !!workplace && (
      <Wrapper>
        <TopBlock>
          <TopTitle>Рабочее место успешно опубликовано!</TopTitle>
          <Subtitle>
            Теперь мастера смогут отправлять вам заявки на аренду.
          </Subtitle>
          <Link
            href={`/${salon?.city?.slug || city.slug}/rent/${
              salon?.id
            }/room/${workplaceId}/seat/${workplace?.id}`}
            passHref
          >
            <TopLink target="_blank">Просмотр на платформе</TopLink>
          </Link>
        </TopBlock>
        <MediumBlock>
          <MediumTitle>
            Посмотрите как ваше рабочее место выглядит на платформе
          </MediumTitle>
          {workplace?.cover?.url ? (
            <WorkplacePreview url={PHOTO_URL + workplace?.cover?.url}>
              {seatActivity[0]?.title ? (
                <Name>{seatActivity[0]?.title}</Name>
              ) : null}
              <EditButton onClick={editButtonHandler}>
                Редактировать рабочее место в <br /> личном кабинете
              </EditButton>
              {rentalPeriod ? (
                <Price>
                  {rentalPeriod.rentalCost} Р /{' '}
                  {rentalPeriod.rental_period.title}
                </Price>
              ) : null}
            </WorkplacePreview>
          ) : null}
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
  )
}

export default Success
