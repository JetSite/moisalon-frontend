import { FC, MouseEvent, useMemo, useState } from 'react'
import { ISalon } from 'src/types/salon'
import { IBrand } from 'src/types/brands'
import { ISetState } from 'src/types/common'
import ProfileManager, {
  IActiveProfilesView,
  IEntityHandler,
} from '../../ActiveProfile/ProfileManager'
import { IPromotionsType } from '../../CabinetSales'
import { IProfile } from '../../CabinetSales/components/ProfileSelect'
import CreateEvent from 'src/components/blocks/Cabinet/components/CabinetEvents/components/CreateEvent'
import { IMaster } from 'src/types/masters'
import { IEvent } from 'src/types/event'
import { EventsList } from './EventsList'
import { useEventMutate } from '../utils/useEventMutate'

interface ActiveProfileProps {
  activeProfile: ISalon | IBrand | IMaster
  type: IPromotionsType
  setActiveProfile: ISetState<ISalon | IBrand | IMaster | null>
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

  const profile: IProfile = useMemo(
    () => ({
      id: activeProfile.id,
      name: activeProfile.name,
      photo:
        (activeProfile as ISalon).logo ||
        (activeProfile as IMaster).photo ||
        (activeProfile as IBrand).logo ||
        null,
      rent: (activeProfile as ISalon).rent || false,
    }),
    [activeProfile],
  )

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

  console.log('active event', event)

  return (
    <ProfileManager
      type={type}
      profile={profile}
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
