import { IMaster } from 'src/types/masters'
import { IProfileWithType } from '../components/ProfileSelect'
import { ISalon } from 'src/types/salon'
import { IBrand } from 'src/types/brands'
import { IVacancy } from 'src/types/vacancies'
import { IPromotionsType } from '..'

export type IgetPrepareData = (props: IgetPrepareDataProps) => {
  profiles: IProfileWithType[]
}

interface IgetPrepareDataProps {
  masters?: IMaster[]
  salons?: ISalon[]
  brands?: IBrand[]
  vacancies?: IVacancy[] | null
  entityType: 'reviews' | 'sales' | 'vacancies'
}

export const getPrepareData: IgetPrepareData = ({
  masters,
  salons,
  brands,
  vacancies,
  entityType,
}) => {
  const getQuantity = (
    item: IMaster | ISalon | IBrand,
    type?: IPromotionsType,
  ) => {
    console.log(vacancies?.filter(e => e.id === item.id).length)

    let quantity
    switch (entityType) {
      case 'reviews':
        quantity = { active: item.reviews?.length || undefined }
        break
      case 'sales':
        quantity = { active: item.promotions.length, noActive: 0 }
        break
      case 'vacancies':
        quantity = {
          active:
            type === 'salon'
              ? vacancies?.filter(e => e.salon?.id === item.id).length
              : type === 'brand'
              ? vacancies?.filter(e => e.brand?.id === item.id).length
              : undefined,
          noActive: 0,
        }
        break

      default:
    }
    return quantity
  }

  const profiles: IProfileWithType[] = [
    ...(masters?.map(master => ({
      id: master.id,
      name: master.name,
      photo: master.photo,
      rent: false,
      profileType: 'master' as const,
      type: 'мастера',
      quantity: getQuantity(master),
    })) || []),
    ...(salons?.map(salon => ({
      id: salon.id,
      name: salon.name,
      photo: salon.logo,
      rent: salon.rent,
      profileType: 'salon' as const,
      type: salon.rent ? 'салона арендодателя' : 'салона',
      quantity: getQuantity(salon, 'salon'),
    })) || []),
    ...(brands?.map(brand => ({
      id: brand.id,
      name: brand.name,
      photo: brand.logo,
      rent: false,
      profileType: 'brand' as const,
      type: 'бренда',
      quantity: getQuantity(brand, 'brand'),
    })) || []),
  ]
  return { profiles }
}
