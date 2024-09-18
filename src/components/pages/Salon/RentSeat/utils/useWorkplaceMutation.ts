import { ApolloError, useMutation } from '@apollo/client'
import { CREATE_WORKPLACE } from 'src/api/graphql/salon/mutations/createSalonWorkplace'
import { UPDATE_WORKPLACE } from 'src/api/graphql/salon/mutations/updateSalonWorkplace'
import { IApolloRefetch, IID, ISetState } from 'src/types/common'
import { ISalonWorkplace } from 'src/types/workplace'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IPrepareInputWorkplaceForm } from './getPrepareInputWorkplaseForm'

interface IHandleCreateOrUpdateWorkplaceProps {
  workplace: ISalonWorkplace | null
  salonID: IID
  input: Partial<IPrepareInputWorkplaceForm>
  setWorkplace: ISetState<ISalonWorkplace | null>
  setSuccess: ISetState<boolean>
  refetchSalon: IApolloRefetch
}

export type IHandleCreateOrUpdateWorkplace = (
  props: IHandleCreateOrUpdateWorkplaceProps,
) => void

export type IUseWorkplaceMutate = (props: IUseWorkplaceMutateProps) => {
  loading: boolean
  handleCreateOrUpdate: IHandleCreateOrUpdateWorkplace
}

interface IUseWorkplaceMutateProps {
  setErrors: ISetState<string[] | null>
  setErrorPopupOpen: ISetState<boolean>
}

export const useWorkplaceMutate: IUseWorkplaceMutate = ({
  setErrors,
  setErrorPopupOpen,
}) => {
  const onError = (error: ApolloError) => {
    const errorMessages = error.graphQLErrors
      .filter(
        e => e.extensions && e.extensions['code'] !== 'EXEC_NON_NULL_VIOLATION',
      )
      .map(e => e.message)
    setErrors(errorMessages)
    setErrorPopupOpen(true)
  }

  const [createWorkplace, { loading: loadingCreate }] = useMutation(
    CREATE_WORKPLACE,
    {
      onError,
    },
  )

  const [updateWorkplace, { loading: loadingUpdate }] = useMutation(
    UPDATE_WORKPLACE,
    {
      onError,
    },
  )

  const handleCreateOrUpdate: IHandleCreateOrUpdateWorkplace = async ({
    workplace,
    salonID,
    input,
    setWorkplace,
    setSuccess,
    refetchSalon,
  }) => {
    console.log(workplace)

    try {
      let response

      if (workplace?.id) {
        // Обновление рабочего места
        response = await updateWorkplace({
          variables: {
            workplaceId: workplace.id,
            input,
          },
        })
      } else {
        // Создание рабочего места
        response = await createWorkplace({
          variables: {
            input: {
              ...input,
              salon: salonID,
              publishedAt: new Date().toISOString(),
            },
          },
        })
      }

      // Обработка ответа
      const prepareData: ISalonWorkplace = flattenStrapiResponse(
        response.data.updateSalonWorkplace ||
          response.data.createSalonWorkplace,
      )

      setWorkplace(prepareData)
      setSuccess(true)
      await refetchSalon()
    } catch (error) {
      // Логика обработки ошибок (если нужна)
      console.error('Error while creating/updating workplace:', error)
    }
  }

  return {
    loading: loadingCreate || loadingUpdate,
    handleCreateOrUpdate,
  }
}
