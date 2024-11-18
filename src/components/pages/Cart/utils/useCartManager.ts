import { useEffect, useState } from 'react'
import { IBrand } from 'src/types/brands'
import { ICart, IProductCart } from 'src/types/product'
import {
  ICheckUnderMinOrderBrandsResult,
  checkUnderMinOrderBrands,
  filterCheckedBrands,
} from '.'
import { ISetState } from 'src/types/common'
import {
  ICartContentInput,
  IUseMutationCartResult,
  useMutationCart,
} from '../../Catalog/utils/useMutationCart'
import { IUser } from 'src/types/me'

export type IUseCartManager = (
  props: IUseCartManagerProps,
) => IUseCartManagerResult

interface IUseCartManagerResult
  extends Omit<IUseMutationCartResult, 'updateCart'> {
  cart: ICart | null
  brands: IBrand[]
  selectedProducts: IProductCart[]
  setSelectedProducts: ISetState<IProductCart[]>
  underMinOrderBrands: ICheckUnderMinOrderBrandsResult[]
  handleDeleteChecked: () => void
}

interface IUseCartManagerProps {
  data: ICart | null
  user: IUser | null
}

export const useCartManager: IUseCartManager = ({ data, user }) => {
  const [cart, setCart] = useState<ICart | null>(data)
  const { handleMutate, quantityMap, loading, updateCart, errors, setErrors } =
    useMutationCart({
      cart,
      userID: user?.info.id || null,
    })
  const [brands, setBrands] = useState<IBrand[]>([])
  const [underMinOrderBrands, setUnderMinOrderBrands] = useState<
    ICheckUnderMinOrderBrandsResult[]
  >([])
  const [selectedProducts, setSelectedProducts] = useState<IProductCart[]>(
    data?.cartContent || [],
  )

  useEffect(() => {
    const newCartContent: IProductCart[] = []
    cart?.cartContent.forEach(content => {
      const productID = content.product.id
      if (quantityMap[productID] > 0) {
        newCartContent.push({ ...content, quantity: quantityMap[productID] })
      } else if (quantityMap[productID] !== 0) newCartContent.push(content)
    })
    setSelectedProducts(newCartContent)
    cart && setCart({ ...cart, cartContent: newCartContent })
  }, [quantityMap])

  useEffect(() => {
    if (!cart?.cartContent) return
    const allBrands = cart.cartContent.map(item => item.product.brand)
    const filteredBrands = filterCheckedBrands(cart.cartContent, allBrands)
    setBrands(filteredBrands)
  }, [cart?.cartContent])

  useEffect(() => {
    setUnderMinOrderBrands(checkUnderMinOrderBrands(brands, selectedProducts))
  }, [selectedProducts, brands, cart])

  const handleDeleteChecked = () => {
    const newCartContent: IProductCart[] =
      cart?.cartContent.filter(
        e => !selectedProducts.some(item => item.product.id === e.product.id),
      ) || []

    if (cart) {
      setCart({ ...cart, cartContent: newCartContent })
      const input: ICartContentInput[] = newCartContent.map(content => ({
        product: content.product.id,
        quantity: content.quantity,
      }))
      updateCart({
        variables: {
          data: {
            cartContent: input,
          },
          id: cart.id,
        },
      })
    }
  }

  return {
    cart,
    brands,
    selectedProducts,
    setSelectedProducts,
    underMinOrderBrands,
    handleMutate,
    quantityMap,
    loading,
    handleDeleteChecked,
    errors,
    setErrors,
  }
}
