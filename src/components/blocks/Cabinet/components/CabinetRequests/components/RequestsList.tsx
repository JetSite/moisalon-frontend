import { FC, useState } from 'react'
import RequestItem from './RequestItem'
import Button from '../../../../../ui/Button'
import { ListWrapper } from '../styles'
import { IRentalRequest } from 'src/types/rentalRequest'
import { NoOrders } from '../../CabinetOrders/styles'
import { IApolloRefetch } from 'src/types/common'
import MyRequestItem from './MyRequestItem'

interface Props {
  rentalRequests: IRentalRequest[]
  showDeleted: boolean
  refetch: IApolloRefetch
  refetchDeleted: IApolloRefetch
  myRequest?: boolean
}

const RequestsList: FC<Props> = ({
  rentalRequests,
  showDeleted,
  refetch,
  refetchDeleted,
  myRequest,
}) => {
  const [sliceNumber, setSliceNumber] = useState(4)
  const slicedList = rentalRequests?.slice(0, sliceNumber)

  const onFetchMore = () => {
    setSliceNumber(sliceNumber + 4)
  }

  const fetchMoreButton =
    sliceNumber < rentalRequests?.length ? (
      <Button
        size="round218"
        font="roundMedium"
        variant="withRoundBorder"
        mt="23"
        onClick={onFetchMore}
      >
        Смотреть ранее
      </Button>
    ) : null

  console.log(slicedList)

  return (
    <>
      {rentalRequests?.length > 0 ? (
        <>
          <ListWrapper>
            {slicedList?.map(req =>
              myRequest ? (
                <MyRequestItem
                  refetch={refetch}
                  key={req.id}
                  rentalRequest={req}
                  showDeleted={showDeleted}
                  refetchDeleted={refetchDeleted}
                />
              ) : (
                <RequestItem
                  refetch={refetch}
                  key={req.id}
                  rentalRequest={req}
                  showDeleted={showDeleted}
                  refetchDeleted={refetchDeleted}
                />
              ),
            )}
          </ListWrapper>
          {fetchMoreButton}
        </>
      ) : (
        <NoOrders>Нет заявок</NoOrders>
      )}
    </>
  )
}

export default RequestsList
