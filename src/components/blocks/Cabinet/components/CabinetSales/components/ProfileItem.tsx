import { FC } from 'react'
import * as Style from '../styles'
import { PHOTO_URL } from 'src/api/variables'
import { IProfile } from './ProfileSelect'

interface Props {
  profile: IProfile
  type: string
  onClick?: () => void
}

const ProfileItem: FC<Props> = ({ profile, type, onClick }) => {
  return (
    <Style.Item onClick={onClick}>
      <Style.Container>
        <Style.Avatar
          alt="avatar"
          src={
            profile.photo?.url
              ? PHOTO_URL + profile.photo.url
              : 'empty-photo.svg'
          }
        />
        <Style.Content>
          <Style.Name>{profile.name}</Style.Name>
          <Style.Type>Профиль {type}</Style.Type>
        </Style.Content>
      </Style.Container>
    </Style.Item>
  )
}

export default ProfileItem
