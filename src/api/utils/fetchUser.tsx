import { IMe, IMeInfo, IUser, IUserThings } from 'src/types/me'
import { ME } from '../graphql/me/queries/getMe'
import Cookies from 'cookies'
import { INextContext } from 'src/types/common'
import { authConfig, defaultValues } from '../authConfig'
import { initializeApollo } from '../apollo-client'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { USER } from '../graphql/me/queries/getUser'
import { IVacancy } from 'src/types/vacancies'
import { IReview } from 'src/types/reviews'
import { ICity } from 'src/types'
import { checkErr } from './checkErr'

type IFetchUser = ({
  needUser,
}: {
  cookies: Cookies
  needUser?: boolean
}) => Promise<{
  user?: IUser
  selectedCity?: ICity
  me?: IMe
  redirect?: string | null
}>

export const fetchUser: IFetchUser = async ({ needUser = false, cookies }) => {
  const accessToken = cookies.get(authConfig.tokenKeyName)
  const meCookie = cookies.get(authConfig.meKeyName) || null
  const apolloClient = initializeApollo({ accessToken })
  let dataMe = meCookie ? JSON.parse(meCookie) : null
  let redirect: string | null = null

  if (!meCookie && accessToken) {
    const data = await apolloClient.query({
      query: ME,
    })
    console.log(data.data)
    // cookies.set(authConfig.meKeyName, JSON.stringify({ info: data.data.me }))
    dataMe = { info: data.data.me }
  }

  if (!dataMe) {
    redirect = authConfig.notAuthLink
    return { redirect }
  }

  if (!needUser) {
    return { me: dataMe }
  }

  console.log(dataMe)

  const id = dataMe.info.id

  const dataUser = await apolloClient.query({
    query: USER,
    variables: {
      id,
    },
  })
  const errorUser = checkErr([dataUser]).redirect

  if (errorUser) return { redirect: errorUser }

  const prepareData = flattenStrapiResponse(dataUser.data.usersPermissionsUser)
  let user = null
  let selectedCity = null

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
  console.log('usersPermissionsUser', dataUser.data.usersPermissionsUser)

  user = {
    info,
    owner,
    favorite,
    vacancies: prepareData.vacancies as IVacancy[],
    reviews: prepareData.reviews as IReview[],
  }
  selectedCity = prepareData.selected_city as ICity

  return { user, selectedCity, me: dataMe }
}
