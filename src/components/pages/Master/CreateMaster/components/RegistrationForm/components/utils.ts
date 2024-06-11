import { ICity, IPhoto } from 'src/types'
import { IID } from 'src/types/common'
import { IMasterCreateInput } from 'src/types/masters'

interface Props {
  values: { [K: string]: any }
  findCity: ICity | null
  selectCityId: IID | null
  photoId: string
}

type IGetPrepareInputMasterForm = (props: Props) => IMasterCreateInput

export const getPrepareInputMasterForm: IGetPrepareInputMasterForm = ({
  values,
  photoId,
  selectCityId,
  findCity,
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
    photo: photoId,
    city: (findCity?.id as string) || selectCityId || '1',
  }
}
