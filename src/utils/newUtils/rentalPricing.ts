import { ISalonRentalPeriod } from 'src/types/workplace'
import { localeNumber } from '../newUtils/common'

type IFormatRentalPricing = (arr: ISalonRentalPeriod[] | null) => string

export const formatRentalPricing: IFormatRentalPricing = arr => {
  console.log(arr)

  const returnedArr: { period: string; rentalCost: number }[] = []
  if (!arr || !arr.length) {
    return 'неизвестна'
  } else {
    arr.forEach(period => {
      console.log(period.rentalCost)
      returnedArr.push({
        rentalCost: period.rentalCost,
        period: period.rental_period.title,
      })
    })
    if (returnedArr.length && returnedArr[0].rentalCost > 0) {
      return `от ${localeNumber(returnedArr[0].rentalCost)} ₽ / ${
        returnedArr[0].period
      }`
    } else return 'неизвестна'
  }
}
