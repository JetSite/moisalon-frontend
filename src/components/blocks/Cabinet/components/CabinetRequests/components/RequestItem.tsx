import { FC, useEffect, useState } from 'react'
import Button from '../../../../../ui/Button'
import { selectedGroupNamesMax } from '../../../../../../utils/serviceCatalog'
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
} from '../styles'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
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
  const [request, setRequest] = useState(rentalRequest)
  const { user } = useAuthStore(getStoreData)
  const [needRefetch, setNeedRefetch] = useState<boolean>(false)
  const userName = user?.info.username || null
  const phone = user?.info.phone || null
  const email = user?.info.email || null
  const workPlaceTitle = request?.workplace?.title || null
  const salonName = request.salon.name || null
  const salonPhoto = PHOTO_URL + request?.workplace?.cover?.url || null
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
      const prepareData = flattenStrapiResponse(data.updateRentalRequest)
      setRequest(prepareData)

      if (needRefetch) {
        refetch({ variables: { id: 4 } })
        refetchDeleted({ variables: { id: 4 } })
      }
      setNeedRefetch(false)
    },
  })

  useEffect(() => {
    if (request.status.id === '1') {
      updateRentalRequest({
        variables: {
          requestID: request.id,
          input: { status: '2' },
        },
      })
    }
  }, [])

  return (
    <ItemWrapper noView={request.status.id === '1'}>
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
      {/* {request.status.id + ' - ' + request.status.title} */}
      <MasterContent>
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
      </MasterContent>
      <Request>
        <SalonPhoto photo={salonPhoto} />
        <RequestInfo>
          <PositionWrap>
            <Text>Хочет арендовать</Text>
            <Position>{workPlaceTitle}</Position>
          </PositionWrap>
          <Spec>
            {specializationsWorkplace.map((name, i) => (
              <span>
                {i + 1 === specializationsWorkplace.length ? name : name + ', '}
              </span>
            ))}
          </Spec>
          <SalonName>{salonName}</SalonName>
        </RequestInfo>
      </Request>
      <ButtonWrapper>
        <ButtonStyled
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

export default RequestItem
