import { ApolloError, useLazyQuery, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { NOT_PUBLISH_VACANCIES } from 'src/api/graphql/vacancy/queries/getNotPublishVacancies'
import { VACANCIES } from 'src/api/graphql/vacancy/queries/getVacancies'
import { IPagination } from 'src/types'
import { IVacancy } from 'src/types/vacancies'
import {
  StrapiDataObject,
  flattenStrapiResponse,
} from 'src/utils/flattenStrapiResponse'
import { IProfileType } from '../../CabinetSales'
import { IID, ISetState } from 'src/types/common'
import { CREATE_VACANCY } from 'src/api/graphql/vacancy/mutations/createVacancy'
import { IVacancyInput } from './vacancyFormValues'
import {
  IActiveProfilesView,
  IEntityDeleteHandler,
} from '../../ActiveProfile/ProfileManager'
import { UPDATE_VACANCY } from 'src/api/graphql/vacancy/mutations/updateVacancy'

export interface IBaseUseMutateResult {
  loading: boolean
  fetchLoading: boolean
  pagination: IPagination | null
  errors: string[] | null
  setErrors: ISetState<string[] | null>
  setUpdate: ISetState<boolean>
  handleDelete: IEntityDeleteHandler
  handleMore: () => void
}

export interface IUseVacancyMutateResult extends IBaseUseMutateResult {
  vacancies: IVacancy[]
  handleCreateOrUpdate: (values: IVacancyInput, id?: IID) => void
}

type IUseVacancyMutate = (
  props: IUseVacancyMutateProps,
) => IUseVacancyMutateResult

interface IUseVacancyMutateProps {
  type: IProfileType
  profileID: IID
  view: IActiveProfilesView
}

export const useVacancyMutate: IUseVacancyMutate = ({
  type,
  profileID,
  view,
}) => {
  const [vacancies, setVacancies] = useState<IVacancy[]>([])
  const [pagination, setPagination] = useState<IPagination | null>(null)
  const [update, setUpdate] = useState(true)
  const [errors, setErrors] = useState<string[] | null>(null)

  const onCompleted = (data: { vacancies: StrapiDataObject }) => {
    const newData = flattenStrapiResponse(data.vacancies)
    if (update) {
      setVacancies(newData)
      setUpdate(false)
    } else {
      setVacancies(pre => [...pre, ...newData])
    }
    setPagination(data.vacancies.meta?.pagination || null)
  }

  const onError = (error: ApolloError) => {
    const errorMessages = error.graphQLErrors.map(e => e.message)
    setErrors(errorMessages)
  }

  const [getNoPublish, { loading: noPublishLoading }] = useLazyQuery(
    NOT_PUBLISH_VACANCIES,
    {
      onCompleted,
      onError,
    },
  )
  const [getPublish, { loading: publishLoading }] = useLazyQuery(VACANCIES, {
    onCompleted,
    onError,
  })

  const [mutate, { loading }] = useMutation(UPDATE_VACANCY, {
    onError,
    onCompleted: () => {
      setUpdate(true)
    },
  })

  const [create, { loading: createLoading }] = useMutation(CREATE_VACANCY, {
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

  const handleDelete: IEntityDeleteHandler = (id, shouldDelete = true) => {
    const variables = shouldDelete
      ? { id, input: { deleted: true, publishedAt: null } }
      : { id, input: { deleted: true } }
    mutate({ variables })
  }

  const handleCreateOrUpdate = (input: IVacancyInput, id?: IID) => {
    if (!type || !['brand', 'salon'].includes(type)) {
      throw new Error(`Invalid type: ${type}.`)
    }

    if (id) {
      mutate({ variables: { id, input } })
    } else {
      create({ variables: { input } })
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
    vacancies,
    pagination,
    setUpdate,
    handleDelete,
    handleCreateOrUpdate,
    handleMore,
    errors,
    setErrors,
  }
}
