import { create } from 'zustand'
import { IID } from 'src/types/common'
import { ICart } from 'src/types/product'
import { 
  getGuestCart, 
  addToGuestCart, 
  removeFromGuestCart, 
  updateGuestCartItem, 
  clearGuestCart,
  IGuestCart,
  IProductInfo
} from 'src/utils/guestCart'

interface ICartStore {
  // State
  guestCart: IGuestCart
  serverCart: ICart | null
  isLoggedIn: boolean
  
  // Actions
  setServerCart: (cart: ICart | null) => void
  setIsLoggedIn: (isLoggedIn: boolean) => void
  addToCart: (productId: IID, quantity?: number, productInfo?: IProductInfo) => void
  removeFromCart: (productId: IID) => void
  updateCartItemQuantity: (productId: IID, quantity: number) => void
  getItemQuantity: (productId: IID) => number
  getTotalItems: () => number
  clearCart: () => void
  refreshGuestCart: () => void
  mergeGuestCartWithServer: (handleMutate: (params: { itemID: IID; mustGrow: boolean }) => void) => void
}

const useCartStore = create<ICartStore>((set, get) => ({
  // Initial state
  guestCart: { items: [] },
  serverCart: null,
  isLoggedIn: false,

  // Actions
  setServerCart: (cart) => set({ serverCart: cart }),
  
  setIsLoggedIn: (isLoggedIn) => {
    set({ isLoggedIn })
    if (!isLoggedIn) {
      // Refresh guest cart when switching to guest mode
      set({ guestCart: getGuestCart() })
    }
  },

  refreshGuestCart: () => {
    if (!get().isLoggedIn) {
      set({ guestCart: getGuestCart() })
    }
  },

  addToCart: (productId, quantity = 1, productInfo) => {
    const { isLoggedIn } = get()
    if (!isLoggedIn) {
      addToGuestCart(productId, quantity, productInfo)
      set({ guestCart: getGuestCart() })
    }
    // For logged in users, server cart operations are handled by existing useMutationCart
  },

  removeFromCart: (productId) => {
    const { isLoggedIn, guestCart } = get()
    if (!isLoggedIn) {
      const currentItem = guestCart.items.find(item => item.productId === productId)
      if (currentItem) {
        if (currentItem.quantity > 1) {
          updateGuestCartItem(productId, currentItem.quantity - 1)
        } else {
          removeFromGuestCart(productId)
        }
        set({ guestCart: getGuestCart() })
      }
    }
    // For logged in users, server cart operations are handled by existing useMutationCart
  },

  updateCartItemQuantity: (productId, quantity) => {
    const { isLoggedIn } = get()
    if (!isLoggedIn) {
      updateGuestCartItem(productId, quantity)
      set({ guestCart: getGuestCart() })
    }
    // For logged in users, server cart operations are handled by existing useMutationCart
  },

  getItemQuantity: (productId) => {
    const { isLoggedIn, guestCart, serverCart } = get()
    if (isLoggedIn) {
      return serverCart?.cartContent?.find(item => item.product.id === productId)?.quantity || 0
    } else {
      return guestCart.items.find(item => item.productId === productId)?.quantity || 0
    }
  },

  getTotalItems: () => {
    const { isLoggedIn, guestCart, serverCart } = get()
    if (isLoggedIn) {
      return serverCart?.cartContent?.reduce((total, item) => total + item.quantity, 0) || 0
    } else {
      return guestCart.items.reduce((total, item) => total + item.quantity, 0)
    }
  },

  clearCart: () => {
    const { isLoggedIn } = get()
    if (!isLoggedIn) {
      clearGuestCart()
      set({ guestCart: { items: [] } })
    }
  },

  mergeGuestCartWithServer: (handleMutate) => {
    const { guestCart } = get()
    if (guestCart.items.length > 0) {
      guestCart.items.forEach(guestItem => {
        for (let i = 0; i < guestItem.quantity; i++) {
          handleMutate({
            itemID: guestItem.productId,
            mustGrow: true,
          })
        }
      })
      clearGuestCart()
      set({ guestCart: { items: [] } })
    }
  },
}))

export default useCartStore 