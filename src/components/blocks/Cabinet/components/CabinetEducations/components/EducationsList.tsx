import { FC, useState } from 'react'
import RotatingLoader from 'src/components/ui/RotatingLoader'
import { SalesWrapper, Subtitle } from '../styles'
import Education from 'src/components/blocks/Education'
import { IEducation } from 'src/types/education'
import Button from 'src/components/newUI/buttons/Button'
import Popup from 'src/components/ui/Popup'
import { IID } from 'src/types/common'
import { EntityListProps } from '../../ActiveProfile/ProfileManager'

interface Props extends EntityListProps {
  educations: IEducation[]
  handleMore: () => void
}

export const EducationsList: FC<Props> = ({
  loading,
  educations,
  pagination,
  popupText,
  handleDelete,
  handleMore,
  handleClick,
  type,
}) => {
  const [deleteID, setDeleteID] = useState<IID | null>(null)

  if (loading) {
    return <RotatingLoader />
  }

  return (
    <SalesWrapper>
      {educations?.length > 0 ? (
        <>
          {educations?.map(item => (
            <Education
              handleDelete={id => {
                setDeleteID(id)
              }}
              handleClick={handleClick}
              type={type}
              item={item}
              key={item.id}
              cabinet
            />
          ))}
          {pagination && pagination.page < pagination.pageCount ? (
            <Button onClick={handleMore} variant="darkBorder">
              Ещё
            </Button>
          ) : null}
        </>
      ) : (
        <Subtitle>У профиля нет обучающих программ</Subtitle>
      )}
      <Popup
        isOpen={!!deleteID}
        onClose={() => {
          setDeleteID(null)
        }}
        title="Вы собираетесь удалить образовательную программу. "
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
          onClick={() => {
            deleteID && handleDelete && handleDelete(deleteID)
            setDeleteID(null)
          }}
          variant="gray"
        >
          Удалить
        </Button>
      </Popup>
    </SalesWrapper>
  )
}
