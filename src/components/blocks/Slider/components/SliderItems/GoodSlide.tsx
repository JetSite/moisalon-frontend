import { FC } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/react-hooks'
import { cyrToTranslit } from '../../../../../utils/translit'
import ProductCard from '../../../ProductCard'
import { getCart } from '../../../../../_graphql-legacy/cart/getCart'
import { addToCartB2cMutation } from '../../../../../_graphql-legacy/cart/addToB2cCart'
import { removeItemB2cMutation } from '../../../../../_graphql-legacy/cart/removeItemB2c'
import { LazyType } from 'src/types/common'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import useBaseStore from 'src/store/baseStore'

interface Props {
  item: LazyType
}

const GoodSlide: FC<Props> = ({ item }) => {
  const { city } = useBaseStore(getStoreData)
  const { setProducts } = useBaseStore(getStoreEvent)

  const {
    data: dataCart,
    refetch: refetchCart,
    loading: loadingCart,
  } = useQuery(getCart, {
    onCompleted: res => {
      setProducts(res?.getCartB2b?.contents || [])
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

  const add = (item: LazyType, quantity: number) => {
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

  const deleteItem = (item: LazyType) => {
    removeItem({
      variables: {
        input: {
          items: [
            {
              key: item.key,
              quantity: (item.quantity as unknown as number) - 1,
            },
          ],
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
        loading={loadingCart}
        // loadingCart={loadingCart}
        // add={add}
        // addLoading={addLoading}
        // deleteItem={deleteItem}
        // deleteLoading={deleteLoading}
      />
    </Link>
  )
}

export default GoodSlide
