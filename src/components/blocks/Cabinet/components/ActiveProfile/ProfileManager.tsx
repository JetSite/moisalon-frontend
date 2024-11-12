import { FC, MouseEventHandler, ReactElement, useState } from 'react'
import { IBrand } from 'src/types/brands'
import { IMaster } from 'src/types/masters'
import { ISalon } from 'src/types/salon'
import { IPromotionsType } from '../CabinetSales'
import ProfileItem from '../CabinetSales/components/ProfileItem'
import { MobileHidden, MobileVisible } from 'src/styles/common'
import Button from 'src/components/ui/Button'
import { IProfile } from '../CabinetSales/components/ProfileSelect'
import { ButtonWrapper, SalesTabButton } from '../CabinetSales/styles'
import { ISetState } from 'src/types/common'

interface ProfileManagerProps {
  profile: IProfile
  type: IPromotionsType
  createEntity: boolean
  setCreateEntity: ISetState<boolean>
  createEntityButton: string
  onCreateEntity: () => void
  entitiesManagerComponent: ReactElement
  createEntityComponent: ReactElement
  view: IView
  handleViewClick: MouseEventHandler<HTMLButtonElement>
  handleBack: () => void
}

type IView = 'publish' | 'draft'

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
            <ButtonWrapper>
              <SalesTabButton
                size="fullWidth"
                onClick={handleViewClick}
                variant="darkTransparentWithoutBorder"
                font="medium"
                name="publish"
                disabled={view === 'publish'}
              >
                Активные
              </SalesTabButton>
              <SalesTabButton
                size="fullWidth"
                onClick={handleViewClick}
                variant="darkTransparentWithoutBorder"
                font="medium"
                name="draft"
                disabled={view === 'draft'}
              >
                Не активные
              </SalesTabButton>
            </ButtonWrapper>
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
            <ButtonWrapper>
              <SalesTabButton
                size="fullWidth"
                onClick={handleViewClick}
                variant="darkTransparent"
                font="small"
                name="publish"
                disabled={view === 'publish'}
              >
                Активные
              </SalesTabButton>
              <SalesTabButton
                size="fullWidth"
                onClick={handleViewClick}
                variant="darkTransparent"
                font="small"
                name="draft"
                disabled={view === 'draft'}
              >
                Не активные
              </SalesTabButton>
            </ButtonWrapper>
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
