import { FC, useState } from 'react'
import RotatingLoader from 'src/components/ui/RotatingLoader'
import { EventsWrapper, Subtitle } from '../styles'
import Event from 'src/components/blocks/Event'
import { IEvent } from 'src/types/event'
import Button from 'src/components/newUI/buttons/Button'
import Popup from 'src/components/ui/Popup'
import { IID } from 'src/types/common'
import { EntityListProps } from '../../ActiveProfile/ProfileManager'

interface Props extends EntityListProps {
  events: IEvent[]
  handleMore: () => void
}

export const EventsList: FC<Props> = ({
  loading,
  events,
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
    <EventsWrapper>
      {events?.length > 0 ? (
        <>
          {events?.map(item => (
            <Event
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
        <Subtitle>У профиля нет мероприятий</Subtitle>
      )}
      <Popup
        isOpen={!!deleteID}
        onClose={() => {
          setDeleteID(null)
        }}
        title="Вы собираетесь удалить мероприятие. "
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
    </EventsWrapper>
  )
}
