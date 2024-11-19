import { FC, MouseEvent, useMemo, useState } from 'react'
import { ISetState } from 'src/types/common'
import ProfileManager, {
  IActiveProfile,
  IActiveProfilesView,
  IEntityHandler,
} from '../../ActiveProfile/ProfileManager'
import { IProfileType } from '../../CabinetSales'
import CreateEvent from 'src/components/blocks/Cabinet/components/CabinetEvents/components/CreateEvent'
import { IEvent } from 'src/types/event'
import { EventsList } from './EventsList'
import { useEventMutate } from '../utils/useEventMutate'

interface ActiveProfileProps {
  activeProfile: NonNullable<IActiveProfile>
  type: IProfileType
  setActiveProfile: ISetState<IActiveProfile>
}

const ActiveEventProfile: FC<ActiveProfileProps> = ({
  activeProfile,
  type,
  setActiveProfile,
}) => {
  const [view, setView] = useState<IActiveProfilesView>('publish')
  const [event, setEvent] = useState<IEvent | null>(null)
  const [createEvent, setCreateEvent] = useState(false)
  const {
    events,
    setUpdate,
    handleDelete,
    handleCreateOrUpdate,
    handleMore,
    loading,
    pagination,
    fetchLoading,
    errors,
    setErrors,
  } = useEventMutate({
    view,
    type,
    profileID: activeProfile.id,
  })

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.name === 'publish') {
      setView('publish')
    } else {
      setView('draft')
    }
    setUpdate(true)
  }

  const handleVacancyClick: IEntityHandler = e => {
    if (view === 'publish') return
    const targetId = e.currentTarget.id
    if (!targetId) return
    const findSale = events.find(element => element.id === targetId) || null
    setEvent(findSale)
    setCreateEvent(true)
  }

  return (
    <ProfileManager
      type={type}
      profile={activeProfile}
      handleBack={() => {
        setActiveProfile(null)
      }}
      createEntity={createEvent}
      setCreateEntity={setCreateEvent}
      createEntityButton="Создать Мероприятие"
      view={view}
      handleViewClick={handleClick}
      onCreateEntity={() => {
        setEvent(null)
      }}
      createEntityComponent={
        <CreateEvent
          errors={errors}
          setErrors={setErrors}
          type={type}
          activeProfile={activeProfile}
          handleCreateOrUpdate={handleCreateOrUpdate}
          event={event}
          setEvent={setEvent}
          loading={loading}
          setCreate={setCreateEvent}
        />
      }
      entitiesManagerComponent={
        <EventsList
          handleMore={handleMore}
          handleClick={handleVacancyClick}
          loading={fetchLoading}
          type={type}
          events={events}
          handleDelete={handleDelete}
          pagination={pagination}
          popupText={
            view === 'publish'
              ? 'После проверки модератором мероприятие будет удалено безвозвратно. Вы уверены?'
              : undefined
          }
        />
      }
    />
  )
}

export default ActiveEventProfile
