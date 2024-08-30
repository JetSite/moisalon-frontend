import { ApolloError, useMutation } from '@apollo/client'
import { CREATE_CITY } from 'src/api/graphql/city/mutations/createCity'
import { CREATE_SALON } from 'src/api/graphql/salon/mutations/createSalon'
import { UPDATE_SALON } from 'src/api/graphql/salon/mutations/updateSalon'
import { ICity } from 'src/types'
import { ISetState } from 'src/types/common'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { cyrToTranslit } from 'src/utils/translit'
import { ISalon } from 'src/types/salon'
import { IPrepareInputSalonForm } from './getPrepareInputSalonForm'
import { useRouter } from 'next/router'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'

export type IHandleCreateOrUpdateSalon = (
  props: IHandleCreateOrUpdateSalonProps,
) => void

interface IHandleCreateOrUpdateSalonProps {
  citiesArray: ICity[]
  setCitiesArray: ISetState<ICity[]>
  clickCity: string | null
  salon: ISalon | null
  rent: boolean
  input: IPrepareInputSalonForm
}

export type IUseSalonMutate = (props: IUseSalonMutateProps) => {
  loading: boolean
  handleCreateOrUpdateSalon: IHandleCreateOrUpdateSalon
}
interface IUseSalonMutateProps {
  setErrors: ISetState<string[] | null>
  setErrorPopupOpen: ISetState<boolean>
}

export const useSalonMutate: IUseSalonMutate = ({
  setErrors,
  setErrorPopupOpen,
}) => {
  const [addCity] = useMutation(CREATE_CITY)
  const router = useRouter()
  const { me, user } = useAuthStore(getStoreData)
  const { setUser } = useAuthStore(getStoreEvent)

  const onError = (error: ApolloError) => {
    const errorMessages = error.graphQLErrors.map(e => e.message)
    setErrors(errorMessages)
    setErrorPopupOpen(true)
  }

  const [mutate, { loading: loadingUpdate }] = useMutation(UPDATE_SALON, {
    onError,
  })

  const [createSalon, { loading: loadingCreate }] = useMutation(CREATE_SALON, {
    onError,
  })

  const handleCreateOrUpdateSalon: IHandleCreateOrUpdateSalon = async ({
    citiesArray,
    setCitiesArray,
    clickCity,
    salon,
    rent,
    input: initialInput,
  }) => {
    const findCity =
      citiesArray?.find(e => e.slug === cyrToTranslit(clickCity)) || null

    if (!findCity) {
      addCity({
        variables: { name: clickCity, slug: cyrToTranslit(clickCity) },
      }).then(data => {
        const findCityData = flattenStrapiResponse(
          data.data.createCity.data,
        ) as ICity
        const input = { ...initialInput, city: findCityData.id }

        setCitiesArray(prev => prev.concat(findCityData))
        if (salon?.id) {
          mutate({
            variables: {
              salonId: salon.id,
              input,
            },
          }).then(() => {
            router.push(
              `/${findCityData?.slug}/${rent ? 'rent' : 'salon'}/${salon.id}`,
            )
          })
        } else {
          createSalon({
            variables: {
              input: {
                user: me?.info.id,
                ...input,
                publishedAt: new Date().toISOString(),
              },
            },
          }).then(data => {
            user?.owner.salons &&
              setUser({
                ...user,
                owner: {
                  ...user.owner,
                  salons: [
                    ...user.owner.salons,
                    flattenStrapiResponse(data.data.createSalon),
                  ],
                },
              })
            router.push(
              `/${findCityData?.slug}/${rent ? 'rent' : 'salon'}/${
                data.data.createSalon.data.id
              }`,
            )
          })
        }
      })
    } else {
      const input = { ...initialInput, city: findCity.id }

      if (salon?.id) {
        mutate({
          variables: {
            salonId: salon.id,
            input,
          },
        }).then(() => {
          router.push(
            `/${findCity?.slug}/${rent ? 'rent' : 'salon'}/${salon.id}`,
          )
        })
      } else {
        createSalon({
          variables: {
            input: {
              user: me?.info.id,
              ...input,
              publishedAt: new Date().toISOString(),
            },
          },
        }).then(data => {
          user?.owner.salons &&
            setUser({
              ...user,
              owner: {
                ...user.owner,
                salons: [
                  ...user.owner.salons,
                  flattenStrapiResponse(data.data.createSalon),
                ],
              },
            })
          router.push(
            `/${findCity?.slug}/${rent ? 'rent' : 'salon'}/${
              data.data.createSalon.data.id
            }`,
          )
        })
      }
    }
  }

  return {
    loading: loadingCreate || loadingUpdate,
    handleCreateOrUpdateSalon,
  }
}
