import { IID } from 'src/types/common'

export interface IGuestCartItem {
  productId: IID
  quantity: number
  // Store essential product info for display
  name: string
  price: number
  image?: string
  brand?: string
  slug?: string
}

export interface IGuestCart {
  items: IGuestCartItem[]
}

export interface IProductInfo {
  id: IID
  name: string
  price: number
  image?: string
  brand?: string
  slug?: string
}

const GUEST_CART_KEY = 'guestCart'

export const getGuestCart = (): IGuestCart => {
  if (typeof window === 'undefined') return { items: [] }
  
  try {
    const cart = localStorage.getItem(GUEST_CART_KEY)
    return cart ? JSON.parse(cart) : { items: [] }
  } catch (error) {
    console.error('Error reading guest cart:', error)
    return { items: [] }
  }
}

export const saveGuestCart = (cart: IGuestCart): void => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart))
  } catch (error) {
    console.error('Error saving guest cart:', error)
  }
}

export const addToGuestCart = (
  productId: IID, 
  quantity: number = 1, 
  productInfo?: IProductInfo
): void => {
  const cart = getGuestCart()
  const existingItem = cart.items.find(item => item.productId === productId)
  
  if (existingItem) {
    existingItem.quantity += quantity
  } else if (productInfo) {
    cart.items.push({ 
      productId, 
      quantity,
      name: productInfo.name,
      price: productInfo.price,
      image: productInfo.image,
      brand: productInfo.brand,
      slug: productInfo.slug,
    })
  } else {
    // Fallback: just store ID and quantity (for backward compatibility)
    cart.items.push({ 
      productId, 
      quantity,
      name: 'Unknown Product',
      price: 0,
    })
  }
  
  saveGuestCart(cart)
}

export const updateGuestCartItem = (productId: IID, quantity: number): void => {
  const cart = getGuestCart()
  const existingItem = cart.items.find(item => item.productId === productId)
  
  if (existingItem) {
    if (quantity <= 0) {
      cart.items = cart.items.filter(item => item.productId !== productId)
    } else {
      existingItem.quantity = quantity
    }
  }
  
  saveGuestCart(cart)
}

export const removeFromGuestCart = (productId: IID): void => {
  const cart = getGuestCart()
  cart.items = cart.items.filter(item => item.productId !== productId)
  saveGuestCart(cart)
}

export const clearGuestCart = (): void => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(GUEST_CART_KEY)
}

export const getGuestCartItemQuantity = (productId: IID): number => {
  const cart = getGuestCart()
  const item = cart.items.find(item => item.productId === productId)
  return item ? item.quantity : 0
}

export const getGuestCartItemsCount = (): number => {
  const cart = getGuestCart()
  return cart.items.reduce((total, item) => total + item.quantity, 0)
} 