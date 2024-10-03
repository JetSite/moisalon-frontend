import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { CREATE_CART } from 'src/api/graphql/cart/mutations/createCart'
import { UPDATE_CART } from 'src/api/graphql/cart/mutations/updateCart'
import { IApolloOnCompleted, IID, ISetState } from 'src/types/common'
import { ICart } from 'src/types/product'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { isEqual } from 'lodash'

interface IHandleMutateCartProps {
  itemID: IID
  mustGrow: boolean
}

export interface IQuantityMap {
  [K: string]: number
}

type IHandleMutateCart = (props: IHandleMutateCartProps) => void

type IUseMutationCart = (props: IUseMutationCartProps) => {
  loading: boolean
  handleMutate: IHandleMutateCart
  quantityMap: IQuantityMap
}

interface IUseMutationCartProps {
  setCart: (cart: ICart | null) => void
  cart: ICart | null
  userID: IID | null
}

interface ICartContentInput {
  product: IID
  quantity: number
}

export const useMutationCart: IUseMutationCart = ({
  setCart,
  cart,
  userID,
}) => {
  const [loading, setLoading] = useState(false)
  const [quantityMap, setQuantityMap] = useState<IQuantityMap>({})

  const debounceQuantityMap = useDebounce(quantityMap, 4000)

  const onCompleted: IApolloOnCompleted<any> = data => {
    if (data?.createCart?.data) {
      setCart(flattenStrapiResponse(data.createCart.data))
    } else {
      setCart(flattenStrapiResponse(data.updateCart.data))
    }
    setLoading(false)
  }

  useEffect(() => {
    const resultQuantityMap = debounceQuantityMap[0]
    const arrID = Object.keys(resultQuantityMap)
    const cartContent = arrID
      .map(e =>
        resultQuantityMap[e] > 0
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
              return match.quantity > 0 ? match : null
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
  })

  const [updateCart] = useMutation(UPDATE_CART, {
    onCompleted,
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

  return { loading, handleMutate, quantityMap }
}
