import { IPhoto } from 'src/types'
import { IID } from 'src/types/common'
import { IVacancy } from 'src/types/vacancies'

type IVacancyFormValues = (
  props: IVacancyFormValuesProps,
) => IVacancyInitialForm

interface IVacancyFormValuesProps {
  vacancy: IVacancy | null
}

export interface IVacancyInitialForm
  extends Pick<IVacancy, 'title' | 'shortDescription' | 'fullDescription'> {
  amountFrom: string
  amountTo: string
  cover: IPhoto | null
  publish: boolean
}

export interface IVacancyInput
  extends Pick<
    IVacancy,
    'amountFrom' | 'amountTo' | 'fullDescription' | 'title' | 'shortDescription'
  > {
  user?: IID
  cover: IID
  brand?: IID
  salon?: IID
}

export const getVacancyInitialValues: IVacancyFormValues = ({ vacancy }) => {
  return vacancy
    ? {
        title: vacancy.title,
        shortDescription: vacancy.shortDescription,
        fullDescription: vacancy.fullDescription,
        amountFrom: vacancy.amountFrom.toString(),
        amountTo: vacancy.amountTo.toString(),
        cover: vacancy.cover,
        publish: false,
      }
    : {
        title: '',
        shortDescription: '',
        fullDescription: '',
        amountFrom: '',
        amountTo: '',
        cover: null,
        publish: false,
      }
}
