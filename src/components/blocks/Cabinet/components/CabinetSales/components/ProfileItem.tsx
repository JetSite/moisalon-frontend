import { FC } from 'react'
import * as Styled from '../styles'
import { PHOTO_URL } from 'src/api/variables'
import { IProfile } from './ProfileSelect'

export interface IProfileItem {
  profile: IProfile
  type: string
  onClick?: () => void
  active?: boolean
  quantityTitles?: string[]
}

const ProfileItem: FC<IProfileItem> = ({
  profile,
  type,
  onClick,
  active,
  quantityTitles,
}) => {
  return (
    <Styled.Item active={active} onClick={onClick}>
      <Styled.Container>
        <Styled.AvatarContainer>
          <Styled.Avatar
            alt="avatar"
            src={
              profile.photo?.url
                ? PHOTO_URL + profile.photo.url
                : 'empty-photo.svg'
            }
          />
        </Styled.AvatarContainer>

        <Styled.Content>
          <Styled.Name>{profile.name}</Styled.Name>
          <Styled.Type>Профиль {type}</Styled.Type>
        </Styled.Content>
        {quantityTitles || profile.quantity?.active ? (
          <Styled.QuantityProfileEntyties
            title={quantityTitles && quantityTitles[0]}
          >
            {profile.quantity?.active}
          </Styled.QuantityProfileEntyties>
        ) : null}
        {quantityTitles ? (
          <Styled.QuantityProfileEntyties
            color="gray"
            title={quantityTitles[1]}
          >
            {profile.quantity?.noActive}
          </Styled.QuantityProfileEntyties>
        ) : null}
      </Styled.Container>
    </Styled.Item>
  )
}

export default ProfileItem
