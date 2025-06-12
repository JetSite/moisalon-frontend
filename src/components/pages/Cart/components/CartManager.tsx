import { FC, useMemo } from 'react'
import {
  OrderWrap,
  Total,
  TextSumm,
  TextTotal,
  TotalBrand,
  TextBrandTotal,
  TextBrandSumm,
} from './styled'
import { IProductCart } from 'src/types/product'
import {
  ICheckUnderMinOrderBrandsResult,
  filterCheckedBrands,
  totalSumm,
} from '../utils'
import { IBrand } from 'src/types/brands'
import LinkButton from 'src/components/newUI/buttons/LinkButton'
import { IGuestCart } from 'src/utils/guestCart'

interface Props {
  selectedProducts: IProductCart[]
  brands: IBrand[]
  isLogin: boolean
  loading: boolean
  underMinOrderBrands: ICheckUnderMinOrderBrandsResult[]
  guestCart?: IGuestCart
}

export const CartManager: FC<Props> = ({
  selectedProducts,
  underMinOrderBrands,
  brands,
  isLogin,
  loading,
  guestCart,
}) => {
  const disabledButton = isLogin
    ? !selectedProducts?.length || underMinOrderBrands.length > 0
    : !guestCart?.items?.length

  const totalOrderSumm = useMemo(() => {
    if (isLogin) {
      return totalSumm(selectedProducts)
    } else {
      // Calculate total for ALL guest cart items (not just selected)
      return (
        guestCart?.items?.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        ) || 0
      )
    }
  }, [selectedProducts, guestCart, isLogin])

  return (
    <OrderWrap>
      <Total>
        <TextSumm>Сумма заказа:</TextSumm>
        <TextTotal>{`${totalOrderSumm.toLocaleString()} ₽`}</TextTotal>
      </Total>
      {underMinOrderBrands.length
        ? underMinOrderBrands.map(item =>
            item.name ? (
              <TotalBrand key={item.name}>
                <TextBrandSumm>
                  Минимальная сумма заказа бренда - {item.name}:
                </TextBrandSumm>

                <TextBrandTotal>{item.summ}</TextBrandTotal>
              </TotalBrand>
            ) : null,
          )
        : null}

      <LinkButton
        href={!isLogin ? '/login' : `/order`}
        size="fullWidth"
        variant="red"
        loading={loading}
        disabled={loading || disabledButton}
        onClick={() => {
          if (isLogin) {
            sessionStorage.setItem(
              'cartChecked',
              JSON.stringify({
                items: [selectedProducts],
                brands: [filterCheckedBrands(selectedProducts, brands)],
              }),
            )
          } else {
            // Store flag to redirect to order after login
            sessionStorage.setItem('redirectToOrderAfterLogin', 'true')
            // Store ALL guest items for after login (not just selected)
            sessionStorage.setItem(
              'guestCartItems',
              JSON.stringify(guestCart?.items || []),
            )
          }
        }}
      >
        {loading ? 'Подождите' : ' Перейти к оформлению'}
      </LinkButton>
    </OrderWrap>
  )
}
