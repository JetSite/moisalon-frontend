import { FC, useEffect, useState } from 'react'
import Button from '../../../../../ui/Button'
import {
  ItemWrapper,
  MasterContent,
  MasterPhoto,
  SalonPhoto,
  Photo,
  Info,
  Name,
  Spec,
  Phone,
  Email,
  Request,
  RequestInfo,
  Text,
  PositionWrap,
  Position,
  SalonName,
  ButtonWrapper,
  ButtonStyled,
  CloseButton,
  Comment,
} from '../styles'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { PHOTO_URL } from 'src/api/variables'
import { IRentalRequest } from 'src/types/rentalRequest'
import { useMutation } from '@apollo/client'
import { UPDATE_RENTAL_REQUEST } from 'src/api/graphql/rentalRequest/mutations/updateRentalRequest'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IApolloRefetch } from 'src/types/common'

interface Props {
  rentalRequest: IRentalRequest
  showDeleted: boolean
  refetch: IApolloRefetch
  refetchDeleted: IApolloRefetch
}

const MyRequestItem: FC<Props> = ({
  rentalRequest,
  showDeleted,
  refetch,
  refetchDeleted,
}) => {
  const [request, setRequest] = useState(rentalRequest)
  const { user, masterCabinetTabs } = useAuthStore(getStoreData)
  const { updateMasterCabinetTabs } = useAuthStore(getStoreEvent)
  const [isNew, setIsNew] = useState<boolean>(request.status.id === '1')
  const [needRefetch, setNeedRefetch] = useState<boolean>(false)
  // const userName = user?.info.username || null
  // const phone = user?.info.phone || null
  // const email = user?.info.email || null
  const workPlaceTitle = request?.workplace?.title || null
  const salonName = request.salon.name || null
  const salonPhoto = PHOTO_URL + request?.workplace?.cover?.url || null
  // const specializationsMaster =
  //   user?.owner.masters && user?.owner.masters?.length
  //     ? user?.owner.masters[0].services.map(service => service.service?.title)
  //     : []
  const specializationsWorkplace = request.workplace.services.map(
    service => service.title,
  )

  const firstButtonText = showDeleted
    ? 'Удалена'
    : request.status.id === '1'
    ? 'Не просмотрена'
    : request.status.id === '2'
    ? 'Просмотрено'
    : request.status.id === '3'
    ? 'Подтверждена'
    : request.status.id === '4'
    ? 'Отклонена'
    : ''
  const secondButtonText = showDeleted
    ? 'Восстановить'
    : request.status.id === '4'
    ? 'Удалить заявку'
    : 'Отменить'

  const [updateRentalRequest] = useMutation(UPDATE_RENTAL_REQUEST, {
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      const prepareData: IRentalRequest = flattenStrapiResponse(
        data.updateRentalRequest,
      )
      const newCount =
        masterCabinetTabs &&
        masterCabinetTabs.rentalRequests &&
        masterCabinetTabs.rentalRequests > 0
          ? (masterCabinetTabs.rentalRequests -= 1)
          : 0

      setRequest(prepareData)
      updateMasterCabinetTabs('requests', newCount)

      if (needRefetch) {
        refetch({ variables: { id: 4 } })
        refetchDeleted({ variables: { id: 4 } })
      }
      setNeedRefetch(false)
    },
  })

  const updateViewStatus = () => {
    if (request.status.id === '1') {
      updateRentalRequest({
        variables: {
          requestID: request.id,
          input: { status: '2' },
        },
      })
      setIsNew(false)
    }
  }

  useEffect(() => {
    const updateId = setTimeout(updateViewStatus, 3000)
    return () => {
      clearTimeout(updateId)
    }
  }, [])

  return (
    <ItemWrapper myRequests noView={isNew}>
      {!showDeleted && (
        <CloseButton
          onClick={() => {
            setNeedRefetch(true)
            updateRentalRequest({
              variables: {
                requestID: request.id,
                input: { publishedAt: null },
              },
            })
          }}
        />
      )}
      {/* <MasterContent>
        {user?.info.avatar ? (
          <MasterPhoto>
            <Photo src={PHOTO_URL + user?.info.avatar.url} />
          </MasterPhoto>
        ) : null}
        <Info>
          <Name>{userName}</Name>
          <Spec>
            {specializationsMaster.map((name, i) => (
              <span>
                {i + 1 === specializationsMaster.length ? name : name + ', '}
              </span>
            ))}
          </Spec>
          <Phone>{phone}</Phone>
          <Email>{email}</Email>
        </Info>
      </MasterContent> */}
      <Request>
        <SalonPhoto photo={salonPhoto} />
        <RequestInfo>
          <PositionWrap>
            <Text>Хочу арендовать</Text>
            <Position>{workPlaceTitle}</Position>
          </PositionWrap>
          <Spec>
            {specializationsWorkplace.map((name, i) => (
              <span key={name}>
                {i + 1 === specializationsWorkplace.length ? name : name + ', '}
              </span>
            ))}
          </Spec>
          <SalonName>{salonName}</SalonName>
        </RequestInfo>
      </Request>
      {request.comment ? <Comment>{request.comment}</Comment> : null}
      <ButtonWrapper>
        <ButtonStyled
          size="roundMedium"
          variant="redWithRoundBorder"
          font="roundMedium"
          disabled
          onClick={() => {
            updateRentalRequest({
              variables: {
                requestID: request.id,
                input: { status: '3' },
              },
            })
          }}
        >
          {firstButtonText}
        </ButtonStyled>
        <Button
          size="roundMedium"
          variant={showDeleted ? 'redWithRoundBorder' : 'withRoundBorder'}
          font="roundMedium"
          onClick={() => {
            if (showDeleted) {
              setNeedRefetch(true)
              updateRentalRequest({
                variables: {
                  requestID: request.id,
                  input: { publishedAt: new Date().toISOString() },
                },
              })
              return
            }
            if (request.status.id === '3' || request.status.id === '2') {
              updateRentalRequest({
                variables: {
                  requestID: request.id,
                  input: { status: '4' },
                },
              })
              return
            }
            if (request.status.id === '4') {
              setNeedRefetch(true)
              updateRentalRequest({
                variables: {
                  requestID: request.id,
                  input: { publishedAt: null },
                },
              })
            }
          }}
        >
          {secondButtonText}
        </Button>
      </ButtonWrapper>
    </ItemWrapper>
  )
}

export default MyRequestItem
