import { FC, MouseEvent, useMemo, useState } from 'react'
import { ISalon } from 'src/types/salon'
import { IBrand } from 'src/types/brands'
import { ISetState } from 'src/types/common'
import ProfileManager, {
  IActiveProfile,
  IActiveProfilesView,
  IEntityHandler,
} from '../../ActiveProfile/ProfileManager'
import { IProfileType } from '../../CabinetSales'
import { VacanciesList } from './VacanciesList'
import { IVacancy } from 'src/types/vacancies'
import CreateVacancy from './CreateVacancy'
import { IProfile } from '../../CabinetSales/components/ProfileSelect'
import { useVacancyMutate } from '../utils/useVacancyMutate'

interface ActiveProfileProps {
  activeProfile: NonNullable<IActiveProfile>
  type: IProfileType
  setActiveProfile: ISetState<IActiveProfile>
}

const ActiveVacanciesProfile: FC<ActiveProfileProps> = ({
  activeProfile,
  type,
  setActiveProfile,
}) => {
  const [view, setView] = useState<IActiveProfilesView>('publish')
  const [vacancy, setVacancy] = useState<IVacancy | null>(null)
  const [createVacancy, setCreateVacancy] = useState(false)
  const {
    vacancies,
    setUpdate,
    handleDelete,
    handleCreateOrUpdate,
    handleMore,
    loading,
    pagination,
    fetchLoading,
    errors,
    setErrors,
  } = useVacancyMutate({
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
    const findSale = vacancies.find(element => element.id === targetId) || null
    setVacancy(findSale)
    setCreateVacancy(true)
  }

  return (
    <ProfileManager
      type={type}
      profile={activeProfile}
      handleBack={() => {
        setActiveProfile(null)
      }}
      createEntity={createVacancy}
      setCreateEntity={setCreateVacancy}
      createEntityButton="Создать Вакансию"
      view={view}
      handleViewClick={handleClick}
      onCreateEntity={() => {
        setVacancy(null)
      }}
      createEntityComponent={
        <CreateVacancy
          errors={errors}
          setErrors={setErrors}
          type={type}
          activeProfile={activeProfile}
          handleCreateOrUpdate={handleCreateOrUpdate}
          vacancy={vacancy}
          setVacancy={setVacancy}
          loading={loading}
          setCreateVacancy={setCreateVacancy}
        />
      }
      entitiesManagerComponent={
        <VacanciesList
          handleMore={handleMore}
          handleClick={handleVacancyClick}
          loading={fetchLoading}
          type={type}
          vacancies={vacancies}
          handleDelete={handleDelete}
          pagination={pagination}
          popupText={
            view === 'publish'
              ? 'После проверки модератором вакансия будет удалена безвозвратно. Вы уверены?'
              : undefined
          }
        />
      }
    />
  )
}

export default ActiveVacanciesProfile
