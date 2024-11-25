import { ApolloError, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { CREATE_CART } from 'src/api/graphql/cart/mutations/createCart'
import { UPDATE_CART } from 'src/api/graphql/cart/mutations/updateCart'
import {
  IApolloOnCompleted,
  IAppoloMutationCallback,
  IID,
  ISetState,
} from 'src/types/common'
import { ICart } from 'src/types/product'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { isEqual } from 'lodash'
import { getStoreEvent } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'

interface IHandleMutateCartProps {
  itemID: IID
  mustGrow: boolean
}

export interface IQuantityMap {
  [K: string]: number
}

type IHandleMutateCart = (props: IHandleMutateCartProps) => void

export interface IUseMutationCartResult {
  loading: boolean
  handleMutate: IHandleMutateCart
  quantityMap: IQuantityMap
  updateCart: IAppoloMutationCallback
  errors: string[] | null
  setErrors: ISetState<string[] | null>
}

type IUseMutationCart = (props: IUseMutationCartProps) => IUseMutationCartResult

interface IUseMutationCartProps {
  cart: ICart | null
  userID: IID | null
}

export interface ICartContentInput {
  product: IID
  quantity: number
}

export const useMutationCart: IUseMutationCart = ({
  cart: dataCart,
  userID,
}) => {
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useState<ICart | null>(dataCart)
  const [quantityMap, setQuantityMap] = useState<IQuantityMap>({})
  const { setCart: setCartStore } = useAuthStore(getStoreEvent)
  const debounceQuantityMap = useDebounce(quantityMap, 4000)
  const [errors, setErrors] = useState<string[] | null>(null)

  const onError = (error: ApolloError) => {
    const errorMessages = error.graphQLErrors.map(e => e.message)
    setErrors(errorMessages)
  }

  const onCompleted: IApolloOnCompleted<any> = data => {
    const newCart =
      flattenStrapiResponse(data.createCart?.data) ||
      flattenStrapiResponse(data.updateCart?.data)
    setCart(newCart)
    setCartStore(newCart)
    setLoading(false)
  }

  useEffect(() => {
    const resultQuantityMap = debounceQuantityMap[0]
    const arrID = Object.keys(resultQuantityMap)
    const cartContent = arrID
      .map(e =>
        resultQuantityMap[e] >= 0
          ? {
              product: e,
              quantity: resultQuantityMap[e],
            }
          : null,
      )
      .filter(Boolean) as ICartContentInput[]
    if (isEqual(quantityMap, resultQuantityMap) && arrID.length) {
      setLoading(true)
      if (!cart) {
        createCart({
          variables: {
            data: {
              user: userID,
              cartContent,
            },
          },
        })
      } else {
        let newArr = cart.cartContent
          .map(item => {
            const match = cartContent.find(el => el.product === item.product.id)
            if (match) {
              return match.quantity >= 0 ? match : null
            }
            return {
              product: item.product.id,
              quantity: item.quantity,
            }
          })
          .filter(Boolean) as ICartContentInput[]
        cartContent.forEach(newItem => {
          const match = newArr.find(el => el?.product === newItem.product)
          if (!match && newItem.quantity > 0) {
            newArr.push(newItem)
          } else if (match && newItem.quantity === 0) {
            newArr = newArr.filter(el => el?.product !== newItem.product)
          }
        })
        updateCart({
          variables: {
            data: {
              cartContent: newArr,
            },
            id: cart.id,
          },
        })
      }
    }
  }, [debounceQuantityMap[0]])

  const [createCart] = useMutation(CREATE_CART, {
    onCompleted,
    onError,
  })

  const [updateCart] = useMutation(UPDATE_CART, {
    onCompleted,
    onError,
  })

  const handleMutate: IHandleMutateCart = ({ mustGrow, itemID }) => {
    const itemInCart =
      cart?.cartContent.find(el => el.product.id === itemID) || null

    if (itemInCart) {
      if (!mustGrow) {
        setQuantityMap(prev => {
          let value

          if (prev[itemID] || prev[itemID] === 0) {
            value = prev[itemID] !== 1 ? prev[itemID] - 1 : 0
          } else {
            value = itemInCart.quantity !== 1 ? itemInCart.quantity - 1 : 0
          }
          return {
            ...prev,
            [itemID]: value,
          }
        })
      } else {
        setQuantityMap(prev => {
          let value

          if (prev[itemID] || prev[itemID] === 0) {
            value = prev[itemID] + 1
          } else {
            value = itemInCart.quantity + 1
          }

          return {
            ...prev,
            [itemID]: value,
          }
        })
      }
    } else {
      if (mustGrow) {
        setQuantityMap(prev => ({
          ...prev,
          [itemID]: prev[itemID] ? prev[itemID] + 1 : 1,
        }))
      } else {
        setQuantityMap(prev => ({
          ...prev,
          [itemID]: prev[itemID] === 1 ? 0 : prev[itemID] - 1,
        }))
      }
    }
  }

  return { loading, handleMutate, quantityMap, updateCart, errors, setErrors }
}
