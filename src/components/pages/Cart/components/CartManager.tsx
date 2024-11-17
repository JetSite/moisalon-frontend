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

interface Props {
  selectedPropucts: IProductCart[]
  brands: IBrand[]
  isLogin: boolean
  underMinOrderBrands: ICheckUnderMinOrderBrandsResult[]
}

export const CartManager: FC<Props> = ({
  selectedPropucts,
  underMinOrderBrands,
  brands,
  isLogin,
}) => {
  const disabledButton =
    !selectedPropucts?.length || underMinOrderBrands.length > 0
  const totalOrderSumm = useMemo(
    () => totalSumm(selectedPropucts),
    [selectedPropucts],
  )

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
        disabled={disabledButton}
        onClick={() => {
          if (isLogin) {
            sessionStorage.setItem(
              'cartChecked',
              JSON.stringify({
                items: [selectedPropucts],
                brands: [filterCheckedBrands(selectedPropucts, brands)],
              }),
            )
          }
        }}
      >
        Перейти к оформлению
      </LinkButton>
    </OrderWrap>
  )
}
