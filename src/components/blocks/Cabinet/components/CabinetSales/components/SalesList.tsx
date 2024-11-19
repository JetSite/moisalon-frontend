import { FC, MouseEvent, useState } from 'react'
import { IProfileType } from '..'
import { IPromotions } from 'src/types/promotions'
import Sale from '../../../../Sale'
import * as Styled from '../styles'
import { IApolloLazyRefetch, IID, ISetState } from 'src/types/common'
import Button from 'src/components/ui/Button'
import { IPagination } from 'src/types'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import Popup from 'src/components/ui/Popup'
import RotatingLoader from 'src/components/ui/RotatingLoader'
import { EntityListProps } from '../../ActiveProfile/ProfileManager'

interface Props extends EntityListProps {
  sales: IPromotions[]
  setSales: ISetState<IPromotions[]>
  refetch: IApolloLazyRefetch
  searchID: IID
  setPagination: ISetState<IPagination | null>
}

export const SalesList: FC<Props> = ({
  sales,
  type,
  loading,
  handleClick,
  handleDelete,
  refetch,
  searchID,
  setSales,
  pagination,
  setPagination,
  popupText = 'После удаления она не пройдет модерацию и не будет доступна для публикации. Вы уверены?',
}) => {
  const [openPopup, setOpenPopup] = useState<IID | null>(null)
  const handleMore = (e: MouseEvent<HTMLButtonElement>) => {
    pagination &&
      refetch({
        variables: {
          [type as string]: searchID,
          page: pagination.page + 1,
        },
        onCompleted: data => {
          const prepareData: IPromotions[] = flattenStrapiResponse(
            data.promotions,
          )
          const paginationData: IPagination = data.promotions.meta.pagination
          setSales(pre => [...pre, ...prepareData])
          setPagination(paginationData)
        },
      })
  }

  if (loading) {
    return <RotatingLoader />
  }

  return (
    <Styled.Wrapper>
      {sales?.length > 0 ? (
        <>
          <Styled.SalesWrapper as="ul">
            {sales?.map(item => (
              <Sale
                handleDelete={id => {
                  setOpenPopup(id)
                }}
                handleClick={handleClick}
                type={type}
                item={item}
                key={item.id}
              />
            ))}
          </Styled.SalesWrapper>
          {pagination && pagination.page < pagination.pageCount ? (
            <Button onClick={handleMore} variant="darkBorder">
              Ещё
            </Button>
          ) : null}
        </>
      ) : (
        <Styled.Subtitle>У профиля нет акций</Styled.Subtitle>
      )}
      <Popup
        isOpen={!!openPopup}
        onClose={() => {
          setOpenPopup(null)
        }}
        title="Вы собираетесь удалить акцию. "
        content={() => {
          return <p>{popupText}</p>
        }}
      >
        <Button
          style={{ marginTop: 20 }}
          onClick={() => {
            setOpenPopup(null)
          }}
          variant="red"
        >
          Закрыть
        </Button>
        <Button
          style={{ marginTop: 20 }}
          onClick={e => {
            openPopup && handleDelete && handleDelete(openPopup)
            setOpenPopup(null)
          }}
          variant="gray"
        >
          Удалить
        </Button>
      </Popup>
    </Styled.Wrapper>
  )
}
