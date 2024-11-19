import { IBrand } from 'src/types/brands'
import { IProductCart } from 'src/types/product'

export const countProduct = (items: IProductCart[]) => {
  if (!items) return 0
  return items.reduce((count, item) => count + item.quantity, 0)
}

export const totalSumm = (items: IProductCart[]) => {
  if (!items) return 0
  return items.reduce(
    (count, item) =>
      count +
      (item.product.salePrice || item.product.regularPrice || 0) *
        (item.quantity || 0),
    0,
  )
}

type ICheckUnderMinOrderBrands = (
  brands: IBrand[],
  products: IProductCart[],
) => Array<ICheckUnderMinOrderBrandsResult>

export interface ICheckUnderMinOrderBrandsResult {
  name: string
  summ: string
}

export const checkUnderMinOrderBrands: ICheckUnderMinOrderBrands = (
  brands,
  products,
) => {
  return brands
    .filter(brand => typeof brand.minimalOrderPrice === 'number')
    .filter(brand => {
      const filtredProducts = products.filter(
        item => item.product.brand.name.trim() === brand.name.trim(),
      )
      if (filtredProducts.length === 0) {
        return false
      }
      const totalBrandSum = totalSumm(filtredProducts)
      return totalBrandSum < (brand.minimalOrderPrice ?? 0)
    })
    .map(brand => ({
      name: brand.name.trim(),
      summ: `${brand.minimalOrderPrice ?? 0} ₽`,
    }))
}

export const filterCheckedBrands = (
  cartItems: IProductCart[] | null,
  allBrands: IBrand[] | null,
): IBrand[] => {
  if (!cartItems || !allBrands) return []
  const uniqueCheckedBrands: IBrand[] = []

  allBrands.forEach(brand => {
    const isBrandInCart = cartItems.some(
      cartItem => cartItem.product?.brand?.name.trim() === brand.name,
    )
    const isBrandAlreadyAdded = uniqueCheckedBrands.some(
      checkedBrand => checkedBrand.id === brand.id,
    )
    if (isBrandInCart && !isBrandAlreadyAdded) {
      uniqueCheckedBrands.push(brand)
    }
  })

  return uniqueCheckedBrands
}
