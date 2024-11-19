import { ApolloError, useLazyQuery, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { IPagination } from 'src/types'
import {
  StrapiDataObject,
  flattenStrapiResponse,
} from 'src/utils/flattenStrapiResponse'
import { IProfileType } from '../../CabinetSales'
import { IID } from 'src/types/common'
import { IEvent } from 'src/types/event'
import {
  IActiveProfilesView,
  IEntityDeleteHandler,
} from '../../ActiveProfile/ProfileManager'
import { EVENTS } from 'src/api/graphql/event/queries/getEvents'
import { NOT_PUBLISH_EVENTS } from 'src/api/graphql/event/queries/getNotPublishEvents'
import { CREATE_EVENT } from 'src/api/graphql/event/mutations/createEvent'
import { IBaseUseMutateResult } from '../../CabinetVacancies/utils/useVacancyMutate'
import { UPDATE_EVENT } from 'src/api/graphql/event/mutations/updateEvent'
import { IEventInput } from './getEventInitialValues'

export interface IUseEventMutateResult extends IBaseUseMutateResult {
  events: IEvent[]
  handleCreateOrUpdate: (values: IEventInput, id?: IID) => void
}

type IUseEventMutate = (props: IUseEventMutateProps) => IUseEventMutateResult

interface IUseEventMutateProps {
  type: IProfileType
  profileID: IID
  view: IActiveProfilesView
}

export const useEventMutate: IUseEventMutate = ({ type, profileID, view }) => {
  const [events, setEvents] = useState<IEvent[]>([])
  const [pagination, setPagination] = useState<IPagination | null>(null)
  const [update, setUpdate] = useState(true)
  const [errors, setErrors] = useState<string[] | null>(null)

  const onCompleted = (data: { events: StrapiDataObject }) => {
    const newData = flattenStrapiResponse(data.events)
    if (update) {
      setEvents(newData)
      setUpdate(false)
    } else {
      setEvents(pre => [...pre, ...newData])
    }
    setPagination(data.events.meta?.pagination || null)
  }

  const onError = (error: ApolloError) => {
    const errorMessages = error.graphQLErrors.map(e => e.message)
    setErrors(errorMessages)
  }

  const [getNoPublish, { loading: noPublishLoading }] = useLazyQuery(
    NOT_PUBLISH_EVENTS,
    {
      onCompleted,
      onError,
    },
  )
  const [getPublish, { loading: publishLoading }] = useLazyQuery(EVENTS, {
    onCompleted,
    onError,
  })

  const [mutate, { loading }] = useMutation(UPDATE_EVENT, {
    onError,
    onCompleted: () => {
      setUpdate(true)
    },
  })

  const [create, { loading: createLoading }] = useMutation(CREATE_EVENT, {
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

  const handleCreateOrUpdate = (input: IEventInput, id?: IID) => {
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
    events,
    pagination,
    setUpdate,
    handleDelete,
    handleCreateOrUpdate,
    handleMore,
    errors,
    setErrors,
  }
}
