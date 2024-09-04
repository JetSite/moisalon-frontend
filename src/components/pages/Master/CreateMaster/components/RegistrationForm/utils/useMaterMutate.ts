import { ApolloError, useMutation } from '@apollo/client'
import { ICity } from 'src/types'
import { IID, ISetState } from 'src/types/common'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { cyrToTranslit } from 'src/utils/translit'
import { IMaster, IResume } from 'src/types/masters'
import { useRouter } from 'next/router'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { UPDATE_MASTER } from 'src/api/graphql/master/mutations/updateMaster'
import { CREATE_MASTER } from 'src/api/graphql/master/mutations/createMaster'
import { CREATE_RESUME } from 'src/api/graphql/master/mutations/createResume'
import { UPDATE_RESUME } from 'src/api/graphql/master/mutations/updateResume'
import { CREATE_CITY } from 'src/api/graphql/city/mutations/createCity'
import { IMasterCreateInput } from './getPrepareInputMasterForm'
import { useState } from 'react'

export type IHandleCreateOrUpdateMaster = (
  props: IHandleCreateOrUpdateMasterProps,
) => void

interface IHandleCreateOrUpdateMasterProps {
  citiesArray: ICity[]
  setCitiesArray: ISetState<ICity[]>
  clickCity: string | null
  clickCityResume: string | null
  master: IMaster | null
  input: IMasterCreateInput
}

export type IUseMasterMutate = (props: IUseMasterMutateProps) => {
  loading: boolean
  handleCreateOrUpdateMaster: IHandleCreateOrUpdateMaster
}
interface IUseMasterMutateProps {
  setErrors: ISetState<string[] | null>
  setErrorPopupOpen: ISetState<boolean>
}

export const useMasterMutate: IUseMasterMutate = ({
  setErrors,
  setErrorPopupOpen,
}) => {
  const [addCity] = useMutation(CREATE_CITY)
  const router = useRouter()
  const { user } = useAuthStore(getStoreData)
  const { setUser } = useAuthStore(getStoreEvent)
  const [loading, setLoading] = useState(false)

  const onError = (error: ApolloError) => {
    const errorMessages = error.graphQLErrors.map(e => e.message)
    setErrors(errorMessages)
    setErrorPopupOpen(true)
    setLoading(false)
  }

  const onCompleted = (data: any) => {
    const masterData: IMaster =
      flattenStrapiResponse(data.updateMaster) ||
      flattenStrapiResponse(data.createMaster)

    const newMasters = user?.owner.masters?.length
      ? [...user.owner.masters.filter(e => e.id !== masterData.id), masterData]
      : [masterData]

    user && setUser({ ...user, owner: { ...user?.owner, masters: newMasters } })
    router.push(`${masterData.city.slug}/master/${masterData.id}`)
    setLoading(false)
  }

  const [createResume] = useMutation(CREATE_RESUME)
  const [updateResume] = useMutation(UPDATE_RESUME)

  const [updateMaster] = useMutation(UPDATE_MASTER, {
    onError,
    onCompleted,
  })
  const [createMaster] = useMutation(CREATE_MASTER, {
    onError,
    onCompleted,
  })

  const handleCreateOrUpdateMaster: IHandleCreateOrUpdateMaster = async ({
    citiesArray,
    setCitiesArray,
    clickCity,
    clickCityResume,
    master,
    input: initialInput,
  }) => {
    console.log('initialInput', initialInput)
    setLoading(true)
    const { resumeInput, ...input } = initialInput
    const resumeId = master?.resume?.id || null
    const masterId = master?.id
    const findCityResume =
      citiesArray?.find(
        e =>
          e.slug === cyrToTranslit(clickCityResume || clickCity || input.city),
      ) || null
    const findCity =
      citiesArray?.find(
        e => e.slug === cyrToTranslit(clickCity || input.city),
      ) || null

    const mutateMaster = (resume: IID | null) => {
      if (!findCity) {
        addCity({
          variables: { name: clickCity, slug: cyrToTranslit(clickCity) },
          onCompleted: data => {
            const findCityData = flattenStrapiResponse(data.createCity) as ICity
            setCitiesArray(prev => prev.concat(findCityData))
            if (masterId) {
              updateMaster({
                variables: {
                  masterId,
                  input: {
                    ...input,
                    resume,
                    city: findCityData.id,
                  },
                },
              })
            } else {
              createMaster({
                variables: {
                  input: {
                    ...input,
                    user: user?.info.id,
                    resume,
                    city: findCityData.id,
                  },
                },
              })
            }
          },
        })
      } else {
        if (masterId) {
          updateMaster({
            variables: {
              masterId,
              input: { ...input, resume, city: findCity.id },
            },
          })
        } else {
          createMaster({
            variables: {
              input: {
                ...input,
                user: user?.info.id,
                resume,
                city: findCity.id,
                publishedAt: new Date().toISOString(),
              },
            },
          })
        }
      }
    }

    const onCompletedResume = async (data: any) => {
      const resumeData: IResume =
        flattenStrapiResponse(data.updateMasterResume) ||
        flattenStrapiResponse(data.createMasterResume)

      mutateMaster(resumeData.id)
    }

    if (!input.searchWork) {
      mutateMaster(null)
    } else if (!findCityResume) {
      addCity({
        variables: {
          name: clickCityResume ?? clickCity,
          slug: cyrToTranslit(clickCityResume ?? clickCity),
        },
        onCompleted: data => {
          const findCityData = flattenStrapiResponse(data.createCity) as ICity
          setCitiesArray(prev => prev.concat(findCityData))
          if (resumeId) {
            updateResume({
              variables: {
                resumeId,
                input: { ...resumeInput, city: findCityData.id },
              },
              onCompleted: onCompletedResume,
              onError,
            })
          } else {
            createResume({
              variables: {
                input: {
                  ...resumeInput,
                  city: findCityData.id,
                  publishedAt: new Date().toISOString(),
                },
              },
              onCompleted: onCompletedResume,
              onError,
            })
          }
        },
      })
    } else {
      if (resumeId) {
        updateResume({
          variables: {
            resumeId,
            input: { ...initialInput.resumeInput, city: findCityResume.id },
          },
          onCompleted: onCompletedResume,
          onError,
        })
      } else {
        createResume({
          variables: {
            input: {
              ...resumeInput,
              city: findCityResume.id,
              publishedAt: new Date().toISOString(),
            },
          },
          onCompleted: onCompletedResume,
          onError,
        })
      }
    }
  }

  return {
    loading,
    handleCreateOrUpdateMaster,
  }
}
