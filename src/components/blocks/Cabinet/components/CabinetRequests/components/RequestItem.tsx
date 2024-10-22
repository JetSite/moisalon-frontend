import { FC, useEffect, useState } from 'react'
import Button from '../../../../../ui/Button'
import * as Styled from '../styles'
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

const RequestItem: FC<Props> = ({
  rentalRequest,
  showDeleted,
  refetch,
  refetchDeleted,
}) => {
  const requestUser = rentalRequest.user
  const [request, setRequest] = useState(rentalRequest)
  const { user, masterCabinetTabs } = useAuthStore(getStoreData)
  const { updateMasterCabinetTabs } = useAuthStore(getStoreEvent)
  const [isNew, setIsNew] = useState<boolean>(request.status.id === '1')
  const [needRefetch, setNeedRefetch] = useState<boolean>(false)
  const userName = requestUser.username || null
  const phone = requestUser.phone || null
  const email = requestUser.email || null
  const workPlaceTitle = request?.workplace?.title || null
  const salonName = request.salon.name || null
  const salonPhoto = PHOTO_URL + request?.workplace?.cover?.url || null
  const salonsID = user?.owner.salons?.map(e => e.id)
  const specializationsMaster =
    user?.owner.masters && user?.owner.masters?.length
      ? user?.owner.masters[0].services.map(service => service.service?.title)
      : []
  const specializationsWorkplace = request.workplace.services.map(
    service => service.title,
  )
  const firstButtonText = showDeleted
    ? 'Удалено'
    : request.status.id === '3'
    ? 'Подтверждено'
    : 'Подтвердить'
  const secondButtonText = showDeleted
    ? 'Восстановить'
    : request.status.id === '4'
    ? 'Удалить заявку'
    : 'Отклонить'

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
        refetch({ variables: { salonsID } })
        refetchDeleted({ variables: { salonsID } })
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
    <Styled.ItemWrapper noView={isNew}>
      {!showDeleted && (
        <Styled.CloseButton
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
      {/* <Button
        size="roundMedium"
        variant={showDeleted ? 'redWithRoundBorder' : 'withRoundBorder'}
        font="roundMedium"
      >
        {request.status.id + ' - ' + request.status.title}
      </Button> */}
      <Styled.MasterContent>
        {requestUser.avatar ? (
          <Styled.MasterPhoto>
            <Styled.Photo src={PHOTO_URL + requestUser.avatar.url} />
          </Styled.MasterPhoto>
        ) : null}
        <Styled.Info>
          <Styled.Name>{userName}</Styled.Name>
          <Styled.Spec>
            {specializationsMaster.map((name, i) => (
              <span>
                {i + 1 === specializationsMaster.length ? name : name + ', '}
              </span>
            ))}
          </Styled.Spec>
          <Styled.Phone>{phone}</Styled.Phone>
          <Styled.Email>{email}</Styled.Email>
        </Styled.Info>
      </Styled.MasterContent>
      <Styled.Request>
        <Styled.SalonPhoto photo={salonPhoto} />
        <Styled.RequestInfo>
          <Styled.PositionWrap>
            <Styled.Text>Хочет арендовать</Styled.Text>
            <Styled.Position>{workPlaceTitle}</Styled.Position>
          </Styled.PositionWrap>
          <Styled.Spec>
            {specializationsWorkplace.map((name, i) => (
              <span>
                {i + 1 === specializationsWorkplace.length ? name : name + ', '}
              </span>
            ))}
          </Styled.Spec>
          <Styled.SalonName>{salonName}</Styled.SalonName>
        </Styled.RequestInfo>
      </Styled.Request>
      {request.communication_types?.length && (
        <Styled.Сommunication>
          <span>Тип связи: </span>
          {request.communication_types[0].title}
        </Styled.Сommunication>
      )}
      {request.comment ? (
        <Styled.Comment>{request.comment}</Styled.Comment>
      ) : null}
      <Styled.ButtonWrapper>
        <Styled.ButtonStyled
          size="roundMedium"
          variant="redWithRoundBorder"
          font="roundMedium"
          disabled={request.status.id === '3' || showDeleted}
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
        </Styled.ButtonStyled>
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
      </Styled.ButtonWrapper>
    </Styled.ItemWrapper>
  )
}

export default RequestItem
