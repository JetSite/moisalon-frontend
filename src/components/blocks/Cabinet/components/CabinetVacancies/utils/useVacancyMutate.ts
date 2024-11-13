import { ApolloError, useLazyQuery, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { UPDATE_VACANCY } from 'src/api/graphql/vacancy/mutations/updateVacancy'
import { NOT_PUBLISH_VACANCIES } from 'src/api/graphql/vacancy/queries/getNotPublishVacancies'
import { VACANCIES } from 'src/api/graphql/vacancy/queries/getVacancies'
import { IPagination } from 'src/types'
import { IVacancy } from 'src/types/vacancies'
import {
  StrapiDataObject,
  flattenStrapiResponse,
} from 'src/utils/flattenStrapiResponse'
import { IPromotionsType } from '../../CabinetSales'
import { IID, ISetState } from 'src/types/common'
import { IEntityDeleteHandler } from 'src/components/blocks/Sale'
import { IActiveProfilesView } from '../components/ActiveVacanciesProfile'
import { CREATE_VACANCY } from 'src/api/graphql/vacancy/mutations/createVacancy'
import { IVacancyInput } from './vacancyFormValues'

export interface IUseVacancyMutateResult {
  loading: boolean
  fetchloading: boolean
  vacancies: IVacancy[]
  pagination: IPagination | null
  errors: string[] | null
  setErrors: ISetState<string[] | null>
  setUpdate: ISetState<boolean>
  handleDelete: IEntityDeleteHandler
  handleCreateOrUpdate: (values: IVacancyInput, id?: IID) => void
  handleMore: () => void
}

type IUseVacancyMutate = (
  props: IUseVacancyMutateProps,
) => IUseVacancyMutateResult

interface IUseVacancyMutateProps {
  type: IPromotionsType
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
    setPagination(data.vacancies.meta.pagination)
  }

  const onError = (error: ApolloError) => {
    const errorMessages = error.graphQLErrors.map(e => e.message)
    setErrors(errorMessages)
  }

  const [getNoPublish, { loading: noPublishLoading }] = useLazyQuery(
    NOT_PUBLISH_VACANCIES,
    {
      onCompleted,
    },
  )
  const [getPublish, { loading: publishLoading }] = useLazyQuery(VACANCIES, {
    onCompleted,
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

  const handleDelete: IEntityDeleteHandler = id => {
    try {
      mutate({ variables: { id, input: { deleted: true, publishedAt: null } } })
    } catch (error) {
      console.log('Error delete entity:', error)
    }
  }

  const handleCreateOrUpdate = (input: IVacancyInput, id?: IID) => {
    if (!type || !['brand', 'salon'].includes(type)) {
      throw new Error(`Invalid type: ${type}`)
    }
    try {
      if (id) {
        mutate({ variables: { id, input } })
      } else {
        create({ variables: { input } })
      }
    } catch (error) {
      console.log('Error update or create entity:', error)
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
        onError,
        onCompleted,
      })
  }

  return {
    fetchloading: noPublishLoading || publishLoading,
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
