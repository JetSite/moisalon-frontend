import { ICity } from 'src/types'
import { IID } from 'src/types/common'
import { IMeInfo, IOwnersIds, IUser, IUserThings } from 'src/types/me'
import { IOrder } from 'src/types/orders'
import { IReview } from 'src/types/reviews'
import { IVacancy } from 'src/types/vacancies'
import {
  StrapiDataObject,
  flattenStrapiResponse,
  isArray,
} from 'src/utils/flattenStrapiResponse'

type IGetPrepareUser = (data: StrapiDataObject | null) => IPrepareUser | null

export interface IPrepareUser extends IUser {
  selectedCity: ICity
  ownersID: IOwnersIds
}

export const getPrepareUser: IGetPrepareUser = data => {
  if (!data) {
    console.log('data error')
    return null
  }
  const prepareData = flattenStrapiResponse(data)
  if (!prepareData) {
    console.log('prepera date error')
    return null
  }

  let user: IPrepareUser | null = null

  const info: IMeInfo = {
    city: prepareData.city,
    username: prepareData.username,
    phone: prepareData.phone,
    id: prepareData.id,
    email: prepareData.email,
    avatar: prepareData.avatar,
    birthDate: prepareData.birthDate,
  }
  const owner: IUserThings = {
    salons: prepareData.salons,
    masters: prepareData.masters,
    brands: prepareData.brands,
    cart: prepareData.cart,
  }

  const favorite: IUserThings = {
    salons: prepareData.favorited_salons,
    masters: prepareData.favorited_masters,
    brands: prepareData.favorited_brands,
  }

  const ownerKeys = Object.keys(owner) as Array<keyof IUserThings>
  const ownersID = {} as IOwnersIds
  ownerKeys.forEach(key => {
    const ownerThings = owner[key]
    if (isArray(ownerThings)) {
      ownersID[key] = ownerThings.map((e: { id: IID }) => ({
        id: e.id,
      }))
    }
  })

  user = {
    info,
    owner,
    favorite,
    vacancies: prepareData.vacancies as IVacancy[],
    reviews: prepareData.reviews as IReview[],
    orders: [],
    selectedCity: prepareData.selected_city,
    ownersID,
  }

  return user
}
