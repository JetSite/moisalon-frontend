import { ApolloQueryResult } from '@apollo/client'
import { ICity } from 'src/types'
import { IMeInfo, IUser, IUserThings } from 'src/types/me'
import { IReview } from 'src/types/reviews'
import { IVacancy } from 'src/types/vacancies'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'

export type IGetPrepareUser = (data: ApolloQueryResult<any>) => IUser | null

interface IGetPrepareUserProps {}

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

  let user = null

  const info: IMeInfo = {
    city: prepareData.city,
    username: prepareData.username,
    phone: prepareData.phone,
    id: prepareData.id,
    email: prepareData.email,
    avatar: prepareData.avatar,
  }
  const owner: IUserThings = {
    salons: prepareData.salons,
    masters: prepareData.masters,
    brand: prepareData.brands,
  }

  const favorite: IUserThings = {
    salons: prepareData.favorited_salons,
    masters: prepareData.favorited_masters,
    brand: prepareData.favorited_brands,
  }

  user = {
    info,
    owner,
    favorite,
    vacancies: prepareData.vacancies as IVacancy[],
    reviews: prepareData.reviews as IReview[],
  }

  return user
}
