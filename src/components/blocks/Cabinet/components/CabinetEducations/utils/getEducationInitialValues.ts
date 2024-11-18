import moment from 'moment'
import { IPhoto } from 'src/types'
import { IID } from 'src/types/common'
import { IEducation } from 'src/types/education'

type IEducationFormValues = (
  props: IEducationFormValuesProps,
) => IEducationInitialForm

interface IEducationFormValuesProps {
  education: IEducation | null
}

export interface IEducationInitialForm
  extends Pick<
    IEducation,
    | 'title'
    | 'shortDescription'
    | 'fullDescription'
    | 'timeStart'
    | 'timeEnd'
    | 'dateEnd'
    | 'dateStart'
  > {
  amount: number | null
  cover: IPhoto | null
  publishedAt: boolean
}

export interface IEducationInput
  extends Pick<
    IEducation,
    | 'amount'
    | 'fullDescription'
    | 'title'
    | 'shortDescription'
    | 'timeStart'
    | 'timeEnd'
    | 'dateEnd'
    | 'dateStart'
  > {
  user?: IID
  cover: IID
  brand?: IID
  salon?: IID
  master?: IID
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
        dateStart: education.dateStart,
        dateEnd: education.dateEnd,
        timeStart: moment(education.timeStart, 'HH:mm:ss.SSS').format('HH:mm'),
        timeEnd: moment(education.timeEnd, 'HH:mm:ss.SSS').format('HH:mm'),
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
