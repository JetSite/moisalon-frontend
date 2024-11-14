import { FC, MouseEventHandler, ReactElement, useState } from 'react'
import { IPromotionsType } from '../CabinetSales'
import ProfileItem from '../CabinetSales/components/ProfileItem'
import { MobileHidden, MobileVisible } from 'src/styles/common'
import Button from 'src/components/ui/Button'
import { IProfile } from '../CabinetSales/components/ProfileSelect'
import { ISetState } from 'src/types/common'
import { ProfileTabs } from './ProfileTabs'
import { IActiveProfilesView } from '../CabinetVacancies/components/ActiveVacanciesProfile'

interface ProfileManagerProps {
  profile: IProfile
  type: IPromotionsType
  createEntity: boolean
  setCreateEntity: ISetState<boolean>
  createEntityButton: string
  onCreateEntity: () => void
  entitiesManagerComponent: ReactElement
  createEntityComponent: ReactElement
  view: IActiveProfilesView
  handleViewClick: MouseEventHandler<HTMLButtonElement>
  handleBack: () => void
}

const ProfileManager: FC<ProfileManagerProps> = ({
  profile,
  type,
  createEntity,
  setCreateEntity,
  onCreateEntity,
  entitiesManagerComponent,
  createEntityComponent,
  createEntityButton,
  view,
  handleViewClick,
  handleBack,
}) => {
  return (
    <>
      <ProfileItem
        onClick={() => {
          setCreateEntity(false)
          handleBack()
        }}
        profile={profile}
        type={
          type === 'master' ? 'мастера' : type === 'salon' ? 'салона' : 'бренда'
        }
        active={!!profile}
      />
      {!createEntity ? (
        <>
          <MobileHidden>
            <Button
              size="width374WithoutPadding"
              variant="darkTransparent"
              font="medium"
              onClick={() => {
                setCreateEntity(true)
                onCreateEntity()
              }}
            >
              {createEntityButton}
            </Button>
            <ProfileTabs
              size="fullWidth"
              onClick={handleViewClick}
              variant="darkTransparentWithoutBorder"
              font="medium"
              view={view}
            />
          </MobileHidden>
          <MobileVisible>
            <Button
              size="fullWidth"
              onClick={() => {
                setCreateEntity(true)
                onCreateEntity()
              }}
              variant="darkTransparent"
              font="small"
            >
              {createEntityButton}
            </Button>
            <ProfileTabs
              size="fullWidth"
              onClick={handleViewClick}
              variant="darkTransparent"
              font="small"
              view={view}
            />
          </MobileVisible>
          {entitiesManagerComponent}
        </>
      ) : (
        <>{createEntityComponent}</>
      )}
    </>
  )
}

export default ProfileManager
