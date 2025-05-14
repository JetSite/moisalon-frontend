interface PriceFields {
  price?: number | string | null
  priceFrom?: number | string | null
  priceTo?: number | string | null
  unitOfMeasurement?: string
}

export const formatServicePrice = (fields: PriceFields): string => {
  const { price, priceFrom, priceTo, unitOfMeasurement = '' } = fields
  const unit = unitOfMeasurement ? ` ${unitOfMeasurement}` : ''

  if (price !== undefined && price !== null) {
    return `${price}${unit}`
  }

  if (
    priceFrom !== undefined &&
    priceFrom !== null &&
    priceTo !== undefined &&
    priceTo !== null
  ) {
    return `от ${priceFrom} до ${priceTo}${unit}`
  }

  if (priceFrom !== undefined && priceFrom !== null) {
    return `от ${priceFrom}${unit}`
  }

  if (priceTo !== undefined && priceTo !== null) {
    return `до ${priceTo}${unit}`
  }

  return ''
}
