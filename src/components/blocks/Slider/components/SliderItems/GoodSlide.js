import { useContext } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/react-hooks'
import { cyrToTranslit } from '../../../../../utils/translit'
import ProductCard from '../../../ProductCard'
import { CityContext, ProductsContext } from '../../../../../searchContext'
import { getCart } from '../../../../../_graphql-legacy/cart/getCart'
import { addToCartB2cMutation } from '../../../../../_graphql-legacy/cart/addToB2cCart'
import { removeItemB2cMutation } from '../../../../../_graphql-legacy/cart/removeItemB2c'

const GoodSlide = ({ item, chooseProductOneClick }) => {
  const [city] = useContext(CityContext)
  const [productState, setProductsState] = useContext(ProductsContext)

  const {
    data: dataCart,
    refetch: refetchCart,
    loading: loadingCart,
  } = useQuery(getCart, {
    onCompleted: res => {
      setProductsState(res?.getCartB2b?.contents || [])
    },
  })

  const cart = dataCart?.getCartB2b?.contents || []

  const [addToCart, { loading: addLoading }] = useMutation(
    addToCartB2cMutation,
    {
      onCompleted: () => {
        refetchCart()
      },
    },
  )

  const [removeItem, { loading: deleteLoading }] = useMutation(
    removeItemB2cMutation,
    {
      onCompleted: () => {
        refetchCart()
      },
    },
  )

  const add = (item, quantity) => {
    addToCart({
      variables: {
        input: {
          productId: item.id,
          quantity,
          isB2b: true,
        },
      },
    })
  }

  const deleteItem = item => {
    removeItem({
      variables: {
        input: {
          items: [{ key: item.key, quantity: item.quantity - 1 }],
          isB2b: true,
        },
      },
    })
  }

  return (
    <Link href={`/${cyrToTranslit(city)}`}>
      <ProductCard
        item={item}
        cart={cart}
        loadingCart={loadingCart}
        add={add}
        addLoading={addLoading}
        deleteItem={deleteItem}
        deleteLoading={deleteLoading}
        chooseProductOneClick={chooseProductOneClick}
      />
    </Link>
  )
}

export default GoodSlide
