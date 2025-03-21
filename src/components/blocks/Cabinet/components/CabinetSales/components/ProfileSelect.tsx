import { FC } from 'react'
import * as Style from '../styles'
import ProfileItem, { IProfileItem } from './ProfileItem'
import { IPhoto } from 'src/types'
import { IActiveProfile } from '../../ActiveProfile/ProfileManager'

export interface IProfile {
  id: string
  name: string
  photo: IPhoto | null
  rent: boolean
  quantity?: { active?: number; noActive?: number }
}

interface IProfileSelectProps extends Pick<IProfileItem, 'quantityTitles'> {
  profiles: IProfileWithType[]
  activeProfile: IActiveProfile
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
  quantityTitles,
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
            quantityTitles={quantityTitles}
            key={profile.type + '-' + profile.id}
            profile={profile}
            type={profile.type}
            onClick={() => onClickProfile(profile)}
          />
        ))}
    </>
  )
}

export default ProfileSelect
