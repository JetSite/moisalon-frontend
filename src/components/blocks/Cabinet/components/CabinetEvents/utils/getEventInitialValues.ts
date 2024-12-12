import moment from 'moment'
import { IPhoto } from 'src/types'
import { IID } from 'src/types/common'
import { IEvent } from 'src/types/event'
import formatDate from 'src/utils/newUtils/formatDate'
import formatTime from 'src/utils/newUtils/formatTime'

type IEventFormValues = (props: IEventFormValuesProps) => IEventInitialForm

interface IEventFormValuesProps {
  event: IEvent | null
}

export type IEventBaseFields =
  | 'title'
  | 'shortDescription'
  | 'fullDescription'
  | 'timeStart'
  | 'timeEnd'
  | 'address'
  | 'longitude'
  | 'latitude'

export interface IEventInitialForm extends Pick<IEvent, IEventBaseFields> {
  cover: IPhoto | null
  publishedAt: boolean
  dateEnd: string
  dateStart: string
}

export interface IEventInput extends Pick<IEvent, IEventBaseFields> {
  user?: IID
  cover: IID
  brand?: IID
  salon?: IID
  master?: IID
  dateEnd: string
  dateStart: string
}

export const getEventInitialValues: IEventFormValues = ({ event }) => {
  return event
    ? {
        title: event.title,
        shortDescription: event.shortDescription,
        fullDescription: event.fullDescription,
        address: event.address,
        cover: event.cover,
        publishedAt: false,
        dateStart: formatDate(event.dateStart),
        dateEnd: formatDate(event.dateEnd),
        timeStart: formatTime(event.timeStart),
        timeEnd: formatTime(event.timeEnd),
        longitude: event.longitude,
        latitude: event.latitude,
      }
    : {
        title: '',
        shortDescription: '',
        fullDescription: '',
        address: '',
        cover: null,
        publishedAt: false,
        dateStart: '',
        dateEnd: '',
        timeStart: '',
        timeEnd: '',
        longitude: null,
        latitude: null,
      }
}
