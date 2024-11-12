import Vacancy from '../../../../Vacancy'
import { FC, useState } from 'react'
import { IID } from 'src/types/common'
import { IVacancy } from 'src/types/vacancies'

import RotatingLoader from 'src/components/ui/RotatingLoader'
import * as Styled from '../../CabinetSales/styles'
import Button from 'src/components/ui/Button'
import Popup from 'src/components/ui/Popup'
import { SalesListProps } from '../../CabinetSales/components/SalesList'

interface Props
  extends Omit<
    SalesListProps,
    'sales' | 'setSales' | 'refetch' | 'searchID' | 'setPagination'
  > {
  vacancies: IVacancy[]
  handleMore: () => void
}

export const VacanciesList: FC<Props> = ({
  loading,
  type,
  pagination,
  handleDelete,
  popupText,
  handleClick,
  vacancies,
  handleMore,
}) => {
  const [deleteID, setDeleteID] = useState<IID | null>(null)

  if (loading) {
    return <RotatingLoader />
  }

  return (
    <Styled.Wrapper>
      {vacancies?.length > 0 ? (
        <>
          <Styled.SalesWrapper>
            {vacancies?.map(item => (
              <Vacancy
                handleDelete={id => {
                  setDeleteID(id)
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
        <Styled.Subtitle>У профиля нет вакансий</Styled.Subtitle>
      )}
      <Popup
        isOpen={!!deleteID}
        onClose={() => {
          setDeleteID(null)
        }}
        title="Вы собираетесь удалить вакансию. "
        content={() => {
          return <p>{popupText}</p>
        }}
      >
        <Button
          style={{ marginTop: 20 }}
          onClick={() => {
            setDeleteID(null)
          }}
          variant="red"
        >
          Закрыть
        </Button>
        <Button
          style={{ marginTop: 20 }}
          onClick={e => {
            deleteID && handleDelete && handleDelete(deleteID)
            setDeleteID(null)
          }}
          variant="gray"
        >
          Удалить
        </Button>
      </Popup>
    </Styled.Wrapper>
  )
}
