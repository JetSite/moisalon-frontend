import { useState, FC, useMemo } from 'react'
import * as Styled from './styles'
import { CabinetReviews } from './CabinetReviews'
import ProfileSelect, {
  IProfileWithType,
} from '../CabinetSales/components/ProfileSelect'
import { IUser } from 'src/types/me'
import { IProfileType } from '../CabinetSales'
import { getPrepareData } from '../CabinetSales/utils/getPrepareData'
import { IReview } from 'src/types/reviews'

interface Props {
  user: IUser
}

export interface IProfileWithReviews extends IProfileWithType {
  reviews: IReview[]
}

const CabinetListReviews: FC<Props> = ({ user }) => {
  const { salons, masters, brands } = user.owner
  const [type, setType] = useState<IProfileType>(null)
  const [activeProfile, setActiveProfile] =
    useState<IProfileWithReviews | null>(null)

  const { profiles } = useMemo(
    () => getPrepareData({ salons, masters, brands, entityType: 'reviews' }),
    [salons, brands, masters],
  )

  // Функция для обработки клика по профилю
  const handleProfileClick = (profile: (typeof profiles)[0]) => {
    const typedRtofileType = profile.profileType as 'master' | 'salon' | 'brand'
    setType(typedRtofileType)
    const foundProfileReviews =
      [...(salons || []), ...(masters || []), ...(brands || [])].find(
        ({ id }) => id === profile.id,
      )?.reviews || []
    const foundProfile = profiles.find(({ id }) => id === profile.id)
    if (foundProfile) {
      const foundProfileWithReviews: IProfileWithReviews = {
        ...foundProfile,
        reviews: foundProfileReviews,
      }
      setActiveProfile(foundProfileWithReviews)
    } else {
      setActiveProfile(null)
    }
  }

  return (
    <Styled.Wrapper>
      <Styled.TitlePage>Отзывы клиентов</Styled.TitlePage>
      <Styled.Subtitle>
        Нажмите на профиль для просмотра его отзывов
      </Styled.Subtitle>
      <ProfileSelect
        profiles={profiles}
        activeProfile={activeProfile}
        onClickProfile={handleProfileClick}
      />

      {activeProfile && type && (
        <CabinetReviews
          type={type}
          loading={false}
          activeProfile={activeProfile}
          setActiveProfile={setActiveProfile}
        />
      )}
    </Styled.Wrapper>
  )
}

export default CabinetListReviews
