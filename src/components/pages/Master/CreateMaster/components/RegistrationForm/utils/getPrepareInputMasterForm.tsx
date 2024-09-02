import { ICity, IPhoto } from 'src/types'
import { IID } from 'src/types/common'
import { IMasterServices } from 'src/types/masters'

export interface IResumeInput {
  title: string
  content: string
  specialization: string
  age: number
  workSchedule: string
  salary: string
  city: IID | null
  // gender: values.resume_gender,
  // user: me?.info?.id,
  publishedAt: string
}

export interface IMasterCreateInput {
  name: string
  email: string
  phone: string
  description: string
  address: string
  searchWork?: boolean
  services: IMasterServices[]
  webSiteUrl?: string
  haveTelegram?: boolean
  haveViber?: boolean
  haveWhatsApp?: boolean
  photo: IID
  city: IID | null
  resume?: IID
  resumeInput: Omit<IResumeInput, 'publishedAt'>
}

interface Props {
  values: { [K: string]: any }
  findCity?: ICity | null
  findCityResume?: ICity | null
  photo: IPhoto
}

type IGetPrepareInputMasterForm = (props: Props) => IMasterCreateInput

export const getPrepareInputMasterForm: IGetPrepareInputMasterForm = ({
  values,
  photo,
  findCity,
  findCityResume,
}) => {
  const servicesForInput = values.specializations.map((item: { id: IID }) => ({
    service: item,
  }))

  return {
    name: values.name,
    email: values.email,
    phone: values.phone.phoneNumber,
    description: values.description || '',
    address: values.address,
    searchWork: values.searchWork || false,
    services: servicesForInput,
    webSiteUrl: values?.webSiteUrl || '',
    haveTelegram: values?.phone?.haveTelegram || false,
    haveViber: values?.phone?.haveViber || false,
    haveWhatsApp: values?.phone?.haveWhatsApp || false,
    photo: photo.id,
    city: findCity?.id || values.city || null,
    resumeInput: {
      title: values.resume_title,
      content: values.resume_content,
      specialization: values.resume_specialization,
      age: parseInt(values.resume_age) || 0,
      workSchedule: values.resume_workSchedule,
      salary: values.resume_salary,
      city: findCityResume?.id || null,
      // gender: values.resume_gender,
      // user: me?.info?.id,
    },
  }
}
