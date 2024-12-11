import { IPhoto } from 'src/types'
import { IID } from 'src/types/common'
import { IEducation } from 'src/types/education'
import formatTime from 'src/utils/newUtils/formatTime'

type IEducationFormValues = (
  props: IEducationFormValuesProps,
) => IEducationInitialForm

interface IEducationFormValuesProps {
  education: IEducation | null
}

export type IEducationBaseFields =
  | 'title'
  | 'shortDescription'
  | 'fullDescription'
  | 'timeStart'
  | 'timeEnd'

export interface IEducationInitialForm
  extends Pick<IEducation, IEducationBaseFields> {
  amount: number | null
  cover: IPhoto | null
  publishedAt: boolean
  dateEnd: string
  dateStart: string
}

export interface IEducationInput
  extends Pick<IEducation, 'amount' | IEducationBaseFields> {
  user?: IID
  cover: IID
  brand?: IID
  salon?: IID
  master?: IID
  dateEnd: string
  dateStart: string
}

export const getEducationInitialValues: IEducationFormValues = ({
  education,
}) => {
  return education
    ? {
        title: education.title,
        shortDescription: education.shortDescription,
        fullDescription: education.fullDescription,
        amount: education.amount,
        cover: education.cover,
        publishedAt: false,
        dateStart: education.dateStart.toString(),
        dateEnd: education.dateEnd.toString(),
        timeStart: formatTime(education.timeStart),
        timeEnd: formatTime(education.timeEnd),
      }
    : {
        title: '',
        shortDescription: '',
        fullDescription: '',
        amount: null,
        cover: null,
        publishedAt: false,
        dateStart: '',
        dateEnd: '',
        timeStart: '',
        timeEnd: '',
      }
}
