import { workingHoursOptions } from 'src/components/blocks/Form/WorkingTimeField/WorkingTime'
import { IPhonesInitialValue } from 'src/components/pages/Salon/CreateSalon/components/RegistrationForm/utils/getInitialValuesSalonForm'
import { IMaster } from 'src/types/masters'
import { reverseTransformWorkingHours } from 'src/utils/newUtils/reverseTransformWorkingHours'
import { getInitialValuesResumeForm } from './getInitialValuesResumeForm'
import { IUser } from 'src/types/me'

interface IInitialInput
  extends Pick<
    IMaster,
    'name' | 'email' | 'address' | 'searchWork' | 'description' | 'webSiteUrl'
  > {
  specializations: string[]
  phone: IPhonesInitialValue
}

export interface IInitialValuesMasterForm extends IInitialInput {
  checkCart: boolean
}

export type IgetInitialValuesMasterForm = (
  master: IMaster | null,
  user: IUser | null,
) => IInitialValuesMasterForm

export const getInitialValuesMasterForm: IgetInitialValuesMasterForm = (
  master,
  user,
) => {
  const initialInput: IInitialInput = master
    ? {
        email: master.email,
        phone: {
          phoneNumber: master.phone,
          haveTelegram: !!master.haveTelegram,
          haveViber: !!master.haveViber,
          haveWhatsApp: !!master.haveWhatsApp,
        },
        name: master.name,
        address: master.address,
        searchWork: master.searchWork,
        description: master.description,
        specializations: master.services.map(e => e.service.id) || [],
        webSiteUrl: master.webSiteUrl,
      }
    : {
        email: user?.info.email || '',
        phone: {
          phoneNumber: user?.info.phone || '',
          haveTelegram: false,
          haveViber: false,
          haveWhatsApp: false,
        },
        name: user?.info.username || '',
        address: user?.info.city.name || '',
        description: '',
        searchWork: false,
        specializations: [],
        webSiteUrl: '',
      }

  const result: IInitialValuesMasterForm = {
    ...initialInput,
    ...getInitialValuesResumeForm(master?.resume || null),
    checkCart: true,
  }

  return result
}
