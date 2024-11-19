import { ApolloError, useLazyQuery, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { IPagination } from 'src/types'
import {
  StrapiDataObject,
  flattenStrapiResponse,
} from 'src/utils/flattenStrapiResponse'
import { IProfileType } from '../../CabinetSales'
import { IID } from 'src/types/common'
import { IEducation } from 'src/types/education'
import {
  IActiveProfilesView,
  IEntityDeleteHandler,
} from '../../ActiveProfile/ProfileManager'
import { EDUCATIONS } from 'src/api/graphql/education/queries/getEducations'
import { NOT_PUBLISH_EDUCATIONS } from 'src/api/graphql/education/queries/getNotPublishEducations'
import { CREATE_EDUCATION } from 'src/api/graphql/education/mutations/createEducation'
import { IBaseUseMutateResult } from '../../CabinetVacancies/utils/useVacancyMutate'
import { UPDATE_EDUCATION } from 'src/api/graphql/education/mutations/updateEducation'
import { IEducationInput } from './getEducationInitialValues'

export interface IUseEducationMutateResult extends IBaseUseMutateResult {
  educations: IEducation[]
  handleCreateOrUpdate: (values: any, id?: IID) => void
}

type IUseEducationMutate = (
  props: IUseEducationMutateProps,
) => IUseEducationMutateResult

interface IUseEducationMutateProps {
  type: IProfileType
  profileID: IID
  view: IActiveProfilesView
}

export const useEducationMutate: IUseEducationMutate = ({
  type,
  profileID,
  view,
}) => {
  const [educations, setEducations] = useState<IEducation[]>([])
  const [pagination, setPagination] = useState<IPagination | null>(null)
  const [update, setUpdate] = useState(true)
  const [errors, setErrors] = useState<string[] | null>(null)

  const onCompleted = (data: { educations: StrapiDataObject }) => {
    const newData = flattenStrapiResponse(data.educations)
    if (update) {
      setEducations(newData)
      setUpdate(false)
    } else {
      setEducations(pre => [...pre, ...newData])
    }
    setPagination(data.educations.meta?.pagination || null)
  }

  const onError = (error: ApolloError) => {
    const errorMessages = error.graphQLErrors.map(e => e.message)
    setErrors(errorMessages)
  }

  const [getNoPublish, { loading: noPublishLoading }] = useLazyQuery(
    NOT_PUBLISH_EDUCATIONS,
    {
      onCompleted,
      onError,
    },
  )
  const [getPublish, { loading: publishLoading }] = useLazyQuery(EDUCATIONS, {
    onCompleted,
    onError,
  })

  const [mutate, { loading }] = useMutation(UPDATE_EDUCATION, {
    onError,
    onCompleted: () => {
      setUpdate(true)
    },
  })

  const [create, { loading: createLoading }] = useMutation(CREATE_EDUCATION, {
    onError,
    onCompleted: () => {
      setUpdate(true)
    },
  })

  useEffect(() => {
    const query = view === 'publish' ? getPublish : getNoPublish
    if (update) {
      query({ variables: { [type as string]: profileID, pageSize: 2 } })
    }
  }, [update, view])

  const handleDelete: IEntityDeleteHandler = (id, shouldDelete) => {
    const variables = shouldDelete
      ? { id, input: { deleted: true, publishedAt: null } }
      : { id, input: { deleted: true } }

    mutate({ variables })
  }

  const handleCreateOrUpdate = (input: IEducationInput, id?: IID) => {
    if (!type || !['brand', 'salon', 'master'].includes(type)) {
      throw new Error(`Invalid type: ${type}`)
    }
    try {
      if (id) {
        mutate({ variables: { id, input } })
      } else {
        create({ variables: { input } })
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown error occurred while creating or updating'
      setErrors([errorMessage])
    }
  }

  const handleMore = () => {
    const query = view === 'publish' ? getPublish : getNoPublish
    pagination &&
      query({
        variables: {
          [type as string]: profileID,
          pageSize: 2,
          page: pagination.page + 1,
        },
      })
  }

  return {
    fetchLoading: noPublishLoading || publishLoading,
    loading: loading || createLoading,
    educations,
    pagination,
    setUpdate,
    handleDelete,
    handleCreateOrUpdate,
    handleMore,
    errors,
    setErrors,
  }
}
