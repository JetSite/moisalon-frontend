import { useState, FC, useMemo } from 'react'
import { Wrapper, TitlePage, Subtitle } from './styles'
import { IUser } from 'src/types/me'
import { IPromotionsType } from '../CabinetSales'
import { ISalon } from 'src/types/salon'
import { IMaster } from 'src/types/masters'
import { IBrand } from 'src/types/brands'
import { getPrepareData } from '../CabinetSales/utils/getPrepareData'
import ProfileSelect from '../CabinetSales/components/ProfileSelect'
import ActiveEducationProfile from './components/ActiveEducationProfile'

interface Props {
  user: IUser
}

const CabinetEducations: FC<Props> = ({ user }) => {
  const { salons, masters, brands } = user.owner
  const [type, setType] = useState<IPromotionsType>(null)
  const [activeProfile, setActiveProfile] = useState<
    ISalon | IMaster | IBrand | null
  >(null)

  const { profiles } = useMemo(
    () => getPrepareData({ salons, masters, brands, entityType: 'sales' }),
    [salons, brands, masters],
  )

  // const { data, refetch: refetchEducations } = useQuery(currentEducation, {
  //   skip: true,
  //   variables: {
  //     originId: id,
  //   },
  //   onCompleted: res => {
  //     setEducations(res?.currentEducation)
  //     setLoading(false)
  //   },
  // })

  // useEffect(() => {
  //   if (id) {
  //     setLoading(true)
  //     setEducations([])
  //     refetchEducations({
  //       variables: {
  //         originId: id,
  //       },
  //     })
  //   }
  // }, [type, id])

  // Функция для обработки клика по профилю
  const handleProfileClick = (profile: (typeof profiles)[0]) => {
    setType(profile.profileType as 'master' | 'salon' | 'brand')
    switch (profile.profileType) {
      case 'master':
        const foundMaster = masters?.find(master => master.id === profile.id)
        setActiveProfile(foundMaster || null)
        break
      case 'salon':
        const foundSalon = salons?.find(salon => salon.id === profile.id)
        setActiveProfile(foundSalon || null)
        break
      case 'brand':
        const foundBrand = brands?.find(brand => brand.id === profile.id)
        setActiveProfile(foundBrand || null)
        break
      default:
        setActiveProfile(null)
    }
  }

  return (
    <Wrapper>
      <TitlePage>Обучение</TitlePage>
      <Subtitle>
        Нажмите на профиль для просмотра или создания обучений
      </Subtitle>
      <ProfileSelect
        profiles={profiles}
        activeProfile={activeProfile}
        onClickProfile={handleProfileClick}
        quantityTitles={['Одобренные', 'На рассмотрении']}
      />
      {activeProfile && type && (
        <ActiveEducationProfile
          activeProfile={activeProfile}
          type={type}
          setActiveProfile={setActiveProfile}
        />
      )}
    </Wrapper>
  )
}

export default CabinetEducations
