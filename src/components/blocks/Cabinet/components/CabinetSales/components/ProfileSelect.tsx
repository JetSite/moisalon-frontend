import { FC } from 'react'
import * as Style from '../styles'
import ProfileItem from './ProfileItem'
import { IPhoto } from 'src/types'
import { IBrand } from 'src/types/brands'
import { IMaster } from 'src/types/masters'
import { ISalon } from 'src/types/salon'

export interface IProfile {
  id: string
  name: string
  photo: IPhoto | null
  rent: boolean
}

interface IProfileSelectProps {
  profiles: IProfileWithType[]
  activeProfile: ISalon | IMaster | IBrand | null
  onClickProfile: (profile: IProfileWithType) => void
}

export interface IProfileWithType extends IProfile {
  profileType: 'master' | 'salon' | 'brand'
  type: string
}

const ProfileSelect: FC<IProfileSelectProps> = ({
  profiles,
  activeProfile,
  onClickProfile,
}) => {
  return (
    <>
      {profiles.length === 0 ? (
        <Style.Subtitle>У Вас нет профиля</Style.Subtitle>
      ) : null}

      {profiles.length > 0 &&
        !activeProfile &&
        profiles.map(profile => (
          <ProfileItem
            key={profile.id}
            profile={profile}
            type={profile.type}
            onClick={() => onClickProfile(profile)}
          />
        ))}
    </>
  )
}

export default ProfileSelect
