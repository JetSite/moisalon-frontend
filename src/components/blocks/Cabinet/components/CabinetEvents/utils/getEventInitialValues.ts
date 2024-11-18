import moment from 'moment'
import { IPhoto } from 'src/types'
import { IID } from 'src/types/common'
import { IEvent } from 'src/types/event'
import formatTime from 'src/utils/newUtils/formatTime'

type IEventFormValues = (props: IEventFormValuesProps) => IEventInitialForm

interface IEventFormValuesProps {
  event: IEvent | null
}

export interface IEventInitialForm
  extends Pick<
    IEvent,
    | 'title'
    | 'shortDescription'
    | 'fullDescription'
    | 'timeStart'
    | 'timeEnd'
    | 'dateEnd'
    | 'dateStart'
    | 'address'
    | 'longitude'
    | 'latitude'
  > {
  cover: IPhoto | null
  publishedAt: boolean
}

export interface IEventInput
  extends Pick<
    IEvent,
    | 'fullDescription'
    | 'title'
    | 'shortDescription'
    | 'timeStart'
    | 'timeEnd'
    | 'dateEnd'
    | 'dateStart'
    | 'address'
    | 'longitude'
    | 'latitude'
  > {
  user?: IID
  cover: IID
  brand?: IID
  salon?: IID
  master?: IID
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
        dateStart: event.dateStart,
        dateEnd: event.dateEnd,
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
