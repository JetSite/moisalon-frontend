import { useEffect } from 'react'
import { IID, ISetState } from 'src/types/common'
import { ICart, IProduct } from 'src/types/product'
import { IUser } from 'src/types/me'
import { useMutationCart } from 'src/components/pages/Catalog/utils/useMutationCart'
import useCartStore from 'src/store/cartStore'
import { IGuestCart, IProductInfo } from 'src/utils/guestCart'
import { useRouter } from 'next/router'

export interface ICartManager {
  addToCart: (productId: IID, quantity?: number, product?: IProduct) => void
  removeFromCart: (productId: IID) => void
  updateCartItemQuantity: (productId: IID, quantity: number) => void
  getItemQuantity: (productId: IID) => number
  getTotalItems: () => number
  isLoggedIn: boolean
  cart: ICart | null
  loading: boolean
  errors: string[] | null
  setErrors: ISetState<string[] | null>
  guestCart: IGuestCart
}

interface IUseCartManagerProps {
  user: IUser | null
  cart: ICart | null
}

export const useCartManager = ({
  user,
  cart,
}: IUseCartManagerProps): ICartManager => {
  const isLoggedIn = !!user?.info
  const router = useRouter()

  const {
    guestCart,
    setServerCart,
    setIsLoggedIn,
    addToCart: storeAddToCart,
    removeFromCart: storeRemoveFromCart,
    updateCartItemQuantity: storeUpdateCartItemQuantity,
    getItemQuantity: storeGetItemQuantity,
    getTotalItems: storeGetTotalItems,
    refreshGuestCart,
    mergeGuestCartWithServer,
  } = useCartStore()

  const { handleMutate, quantityMap, loading, errors, setErrors } =
    useMutationCart({
      cart,
      userID: user?.info.id || null,
    })

  // Update store when login status changes
  useEffect(() => {
    setIsLoggedIn(isLoggedIn)
    if (isLoggedIn) {
      setServerCart(cart)
    } else {
      refreshGuestCart()
    }
  }, [isLoggedIn, cart, setIsLoggedIn, setServerCart, refreshGuestCart])

  // Merge guest cart when user logs in
  useEffect(() => {
    if (isLoggedIn && guestCart.items.length > 0) {
      mergeGuestCartWithServer(handleMutate)
    }
  }, [
    isLoggedIn,
    guestCart.items.length,
    mergeGuestCartWithServer,
    handleMutate,
  ])

  // Update store when server cart changes
  useEffect(() => {
    if (isLoggedIn) {
      setServerCart(cart)
    }
  }, [cart, isLoggedIn, setServerCart])

  // Handle redirect to order after login
  useEffect(() => {
    if (isLoggedIn && typeof window !== 'undefined') {
      const shouldRedirect = sessionStorage.getItem('redirectToOrderAfterLogin')
      const guestCartItems = sessionStorage.getItem('guestCartItems')
      
      if (shouldRedirect === 'true' && guestCartItems) {
        // Clean up session storage
        sessionStorage.removeItem('redirectToOrderAfterLogin')
        sessionStorage.removeItem('guestCartItems')
        
        // Set up cart data for order page
        if (cart?.cartContent?.length) {
          sessionStorage.setItem(
            'cartChecked',
            JSON.stringify({
              items: [cart.cartContent],
              brands: [], // Will be calculated on order page
            }),
          )
        }
        
        // Redirect to order page
        router.push('/order')
      }
    }
  }, [isLoggedIn, cart, router])

  const addToCart = (
    productId: IID,
    quantity: number = 1,
    product?: IProduct,
  ) => {
    if (isLoggedIn) {
      handleMutate({
        itemID: productId,
        mustGrow: true,
      })
    } else {
      // Convert IProduct to IProductInfo for guest cart
      const productInfo: IProductInfo | undefined = product
        ? {
            id: product.id,
            name: product.name,
            price: product.regularPrice || product.salePrice || 0,
            image: product.cover?.url,
            brand: product.brand?.name,
            slug: `product/${product.id}`, // Use a standard slug format since slug doesn't exist
          }
        : undefined

      storeAddToCart(productId, quantity, productInfo)
    }
  }

  const removeFromCart = (productId: IID) => {
    if (isLoggedIn) {
      handleMutate({
        itemID: productId,
        mustGrow: false,
      })
    } else {
      storeRemoveFromCart(productId)
    }
  }

  const updateCartItemQuantity = (productId: IID, quantity: number) => {
    if (isLoggedIn) {
      const currentQuantity =
        cart?.cartContent?.find(item => item.product.id === productId)
          ?.quantity || 0
      const quantityDiff = quantity - currentQuantity

      if (quantityDiff > 0) {
        for (let i = 0; i < quantityDiff; i++) {
          handleMutate({
            itemID: productId,
            mustGrow: true,
          })
        }
      } else if (quantityDiff < 0) {
        for (let i = 0; i < Math.abs(quantityDiff); i++) {
          handleMutate({
            itemID: productId,
            mustGrow: false,
          })
        }
      }
    } else {
      storeUpdateCartItemQuantity(productId, quantity)
    }
  }

  const getItemQuantity = (productId: IID): number => {
    if (isLoggedIn) {
      const serverQuantity =
        cart?.cartContent?.find(item => item.product.id === productId)
          ?.quantity || 0
      return quantityMap[productId] ?? serverQuantity
    } else {
      return storeGetItemQuantity(productId)
    }
  }

  const getTotalItems = (): number => {
    if (isLoggedIn) {
      return (
        cart?.cartContent?.reduce((total, item) => {
          const quantity = quantityMap[item?.product?.id] ?? item.quantity
          return total + quantity
        }, 0) || 0
      )
    } else {
      return storeGetTotalItems()
    }
  }

  return {
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    getItemQuantity,
    getTotalItems,
    isLoggedIn,
    cart,
    loading,
    errors,
    setErrors,
    guestCart,
  }
}
