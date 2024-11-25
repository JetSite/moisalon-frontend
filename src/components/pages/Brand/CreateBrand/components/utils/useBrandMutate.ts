import { ApolloError, useMutation } from '@apollo/client'
import { CREATE_CITY } from 'src/api/graphql/city/mutations/createCity'
import { ICity, ICountry } from 'src/types'
import { IID, ISetState } from 'src/types/common'
import { IPrepareInputBrandForm } from './getPrepareInputBrandForm'
import { useRouter } from 'next/router'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { UPDATE_BRAND } from 'src/api/graphql/brand/mutations/updateBrand'
import { CREATE_BRAND } from 'src/api/graphql/brand/mutations/createBrand'
import { cyrToTranslit } from 'src/utils/translit'
import { CREATE_COUNTRY } from 'src/api/graphql/country/mutations/createCountry'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IBrand } from 'src/types/brands'
import { useState } from 'react'

export type IHandleCreateOrUpdateBrand = (
  props: IHandleCreateOrUpdateBrandProps,
) => void

interface IHandleCreateOrUpdateBrandProps {
  citiesArray: ICity[]
  setCitiesArray: ISetState<ICity[]>
  selectCity: string | null
  selectCountry: string | null
  countriesArray: ICountry[]
  setCountriesArray: ISetState<ICountry[]>
  input: IPrepareInputBrandForm
  brand: IBrand | null
}

export type IUseBrandMutate = (props: IUseBrandMutateProps) => {
  loading: boolean
  handleCreateOrUpdateBrand: IHandleCreateOrUpdateBrand
}
interface IUseBrandMutateProps {
  setErrors: ISetState<string[] | null>
}

interface MutateBrandProps {
  brandId: IID | null
  input: IPrepareInputBrandForm
  city: IID
  country: IID
}

export const useBrandMutate: IUseBrandMutate = ({ setErrors }) => {
  const [addCity] = useMutation(CREATE_CITY)
  const [addCountry] = useMutation(CREATE_COUNTRY)
  const { setUser } = useAuthStore(getStoreEvent)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { user } = useAuthStore(getStoreData)

  const onError = (error: ApolloError) => {
    const errorMessages = error.graphQLErrors?.map(e => e.message) || []
    setErrors(errorMessages)
  }

  const onCompleted = (data: any) => {
    const brandData: IBrand =
      flattenStrapiResponse(data.updateBrand) ||
      flattenStrapiResponse(data.createBrand)

    const newBrand = user?.owner.brands?.length
      ? [...user.owner.brands.filter(e => e.id !== brandData.id), brandData]
      : [brandData]

    user && setUser({ ...user, owner: { ...user?.owner, brands: newBrand } })
    router.push(`${brandData.city.slug}/brand/${brandData.id}`)
    setLoading(false)
  }

  const [updateBrand] = useMutation(UPDATE_BRAND, {
    onError,
    onCompleted,
  })

  const [createBrand] = useMutation(CREATE_BRAND, {
    onError,
    onCompleted,
  })

  const mutateBrand = ({ brandId, input, city, country }: MutateBrandProps) => {
    if (!user?.info) return
    if (brandId) {
      updateBrand({
        variables: {
          brandId,
          input: {
            ...input,
            user: user.info.id,
            city,
            country,
          },
        },
      })
    } else {
      createBrand({
        variables: {
          input: {
            ...input,
            user: user.info.id,
            city,
            country,
            publishedAt: new Date().toISOString(),
          },
        },
      })
    }
  }

  const handleCreateOrUpdateBrand: IHandleCreateOrUpdateBrand = async ({
    citiesArray,
    setCitiesArray,
    selectCity,
    selectCountry,
    countriesArray,
    setCountriesArray,
    input,
    brand,
  }) => {
    setLoading(true)
    const brandId = brand?.id || null
    const findCity =
      citiesArray?.find(e => e.slug === cyrToTranslit(selectCity)) || null
    const findCountry =
      countriesArray?.find(e => e.slug === cyrToTranslit(selectCountry)) || null

    if (!findCity || !findCountry) {
      if (!findCity) {
        addCity({
          variables: { name: selectCity, slug: cyrToTranslit(selectCity) },
          onCompleted: dataCity => {
            const findCityData = flattenStrapiResponse(
              dataCity.createCity,
            ) as ICity
            setCitiesArray(prev => prev.concat(findCityData))

            if (!findCountry) {
              addCountry({
                variables: {
                  name: selectCountry,
                  slug: cyrToTranslit(selectCountry),
                },
                onCompleted: dataCountry => {
                  const findCountryData = flattenStrapiResponse(
                    dataCountry.createCountry,
                  ) as ICountry
                  setCountriesArray(prev => prev.concat(findCountryData))

                  if (findCityData.id) {
                    mutateBrand({
                      brandId,
                      input,
                      city: findCityData.id,
                      country: findCountryData.id,
                    })
                  }
                },
              })
            } else {
              if (findCityData.id) {
                mutateBrand({
                  brandId,
                  input,
                  city: findCityData.id,
                  country: findCountry.id,
                })
              }
            }
          },
        })
      } else {
        addCountry({
          variables: {
            name: selectCountry,
            slug: cyrToTranslit(selectCountry),
          },
          onCompleted: dataCountry => {
            const findCountryData = flattenStrapiResponse(
              dataCountry.createCountry,
            ) as ICountry
            setCountriesArray(prev => prev.concat(findCountryData))

            if (findCity.id) {
              mutateBrand({
                brandId,
                input,
                city: findCity.id,
                country: findCountryData.id,
              })
            }
          },
        })
      }
    } else {
      if (findCity.id) {
        mutateBrand({
          brandId,
          input,
          city: findCity.id,
          country: findCountry.id,
        })
      }
    }
  }

  return {
    loading: loading,
    handleCreateOrUpdateBrand,
  }
}
