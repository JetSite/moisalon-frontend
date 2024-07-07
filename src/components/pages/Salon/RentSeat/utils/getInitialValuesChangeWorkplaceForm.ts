import { ISalonWorkplace } from 'src/types/workplace'
import { ISalonPage } from 'src/types/salon'
import { IChangeWorkplaceFormValues } from '../components/CreateWorkplace/type'
import { IEquipment } from 'src/types/equipment'

export type IGetInitialValuesChangeWorkplaceForm = (
  props: IGetInitialValuesChangeWorkplaceFormProps,
) => IChangeWorkplaceFormValues

interface IGetInitialValuesChangeWorkplaceFormProps {
  workplace: ISalonWorkplace
}

export const getInitialValuesChangeWorkplaceForm: IGetInitialValuesChangeWorkplaceForm =
  ({ workplace }) => {
    const getequipmentsParsed = (equipments: IEquipment[]) => {
      const equipmentsParsed: { [K: string]: string[] } = {}
      const categoriesArr: string[] = []
      equipments.forEach(e => {
        categoriesArr.push(e.category.id)
      })
      const prepareCategoryArr = [...new Set(categoriesArr)]
      prepareCategoryArr.forEach(categoryID => {
        const items = equipments.filter(e => e.category.id === categoryID)
        equipmentsParsed['equipments' + '_' + categoryID] = items.map(
          item => item.id,
        )
      })
      return equipmentsParsed
    }

    return {
      isAvailableForRent: !!workplace?.isAvailableForRent,
      title: workplace.title,
      activities: workplace?.services.map(e => e.id),
      rentalPricing: workplace?.rentalPricing,
      seatNumber: workplace?.seatNumber,
      shareRent: !!workplace?.shareRent,
      subRent: !!workplace?.subRent,
      rentalPaymentMethods: workplace?.rentalPaymentMethods,
      services: workplace?.services,
      withLicense: !!workplace?.withLicense,
      wetPointsHands: workplace?.wetPointsHands,
      wetPointsHead: workplace?.wetPointsHead,
      wetPointsShower: workplace?.wetPointsShower,
      electricity_sockets_count: null,
      electricity_sockets_extenders_count: null,
      electricity_sockets_ups_count: null,
      space: workplace?.space,
      floor: workplace?.floor,
      description: workplace?.description,
      photos: workplace.gallery,
      hasWindows: !!workplace?.hasWindows,
      ...getequipmentsParsed(workplace.equipment),
    }
  }
