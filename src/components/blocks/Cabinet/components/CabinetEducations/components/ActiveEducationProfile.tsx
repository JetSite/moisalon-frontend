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
import { IProfile } from '../../CabinetSales/components/ProfileSelect'
import CreateEducation from 'src/components/blocks/Cabinet/components/CabinetEducations/components/CreateEducation'

import { IEducation } from 'src/types/education'
import { EducationsList } from './EducationsList'
import { IMaster } from 'src/types/masters'
import { useEducationMutate } from '../utils/useEducationMutate'

interface ActiveProfileProps {
  activeProfile: NonNullable<IActiveProfile>
  type: IProfileType
  setActiveProfile: ISetState<IActiveProfile>
}

const ActiveEducationProfile: FC<ActiveProfileProps> = ({
  activeProfile,
  type,
  setActiveProfile,
}) => {
  const [view, setView] = useState<IActiveProfilesView>('publish')
  const [education, setEducation] = useState<IEducation | null>(null)
  const [createEducation, setCreateEducation] = useState(false)
  const {
    educations,
    setUpdate,
    handleDelete,
    handleCreateOrUpdate,
    handleMore,
    loading,
    pagination,
    fetchLoading,
    errors,
    setErrors,
  } = useEducationMutate({
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
    const findSale = educations.find(element => element.id === targetId) || null
    setEducation(findSale)
    setCreateEducation(true)
  }

  return (
    <ProfileManager
      type={type}
      profile={activeProfile}
      handleBack={() => {
        setActiveProfile(null)
      }}
      createEntity={createEducation}
      setCreateEntity={setCreateEducation}
      createEntityButton="Создать Обучение"
      view={view}
      handleViewClick={handleClick}
      onCreateEntity={() => {
        setEducation(null)
      }}
      createEntityComponent={
        <CreateEducation
          errors={errors}
          setErrors={setErrors}
          type={type}
          activeProfile={activeProfile}
          handleCreateOrUpdate={handleCreateOrUpdate}
          education={education}
          setEducation={setEducation}
          loading={loading}
          setCreate={setCreateEducation}
        />
      }
      entitiesManagerComponent={
        <EducationsList
          handleMore={handleMore}
          handleClick={handleVacancyClick}
          loading={fetchLoading}
          type={type}
          educations={educations}
          handleDelete={handleDelete}
          pagination={pagination}
          popupText={
            view === 'publish'
              ? 'После проверки модератором обучение будет удалена безвозвратно. Вы уверены?'
              : undefined
          }
        />
      }
    />
  )
}

export default ActiveEducationProfile
