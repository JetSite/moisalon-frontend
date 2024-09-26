import { IPromotions } from 'src/types/promotions'
import { IPromotionsType } from '..'
import { IID } from 'src/types/common'
import { IPhoto } from 'src/types'

export type IGetInitialValuesSaleForm = (
  props: IGetInitialValuesSaleFormProps,
) => IInitialValuesSaleForm

export interface IInitialValuesSaleForm
  extends Pick<
    IPromotions,
    | 'title'
    | 'fullDescription'
    | 'shortDescription'
    | 'promoCode'
    | 'dateEnd'
    | 'dateStart'
    | 'id'
  > {
  cover: IPhoto | null
  salon?: IID
  master?: IID
  brand?: IID
}

interface IGetInitialValuesSaleFormProps {
  sale: IPromotions | null
  type: IPromotionsType
  profileID: IID
}

export const getInitialValuesSaleForm: IGetInitialValuesSaleForm = ({
  sale,
  type,
  profileID,
}) => {
  const request: IInitialValuesSaleForm = sale
    ? {
        id: sale.id,
        title: sale.title,
        cover: sale.cover || null,
        fullDescription: sale.fullDescription,
        shortDescription: sale.shortDescription,
        promoCode: sale.promoCode,
        dateStart: sale.dateStart,
        dateEnd: sale.dateEnd,
        [type as string]: profileID,
      }
    : {
        id: '',
        title: '',
        cover: null,
        fullDescription: '',
        shortDescription: '',
        promoCode: '',
        dateStart: '',
        dateEnd: '',
      }
  return request
}
