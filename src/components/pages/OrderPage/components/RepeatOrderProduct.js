import { useQuery } from '@apollo/client'

import {
  ItemChecked,
  ImageWrapper,
  ItemCheckedRight,
  Name,
  Bottom,
  Price,
  Quantity,
} from './../styles'
import { PHOTO_URL } from '../../../../api/variables'

const RepeatOrderProduct = ({ product }) => {
  // const { data, loading } = useQuery(productSearch, {
  //   variables: { id: product.id },
  // })
  const data = null
  return (
    <ItemChecked>
      <ImageWrapper>
        <img
          src={
            data?.product?.photoIds[0]
              ? ` ${PHOTO_URL}${data?.product?.photoIds[0]}/original`
              : '/cosmetic_placeholder.jpg'
          }
          alt="logo"
        />
      </ImageWrapper>
      <ItemCheckedRight>
        <Name>{data?.product?.title}</Name>
        <Bottom>
          <Price>{`${
            (data?.product?.currentAmount &&
              data?.product?.currentAmount?.toLocaleString()) ||
            data?.product?.currentAmount?.toLocaleString()
          } ₽`}</Price>
          <Quantity>{product?.count} шт.</Quantity>
        </Bottom>
      </ItemCheckedRight>
    </ItemChecked>
  )
}

export default RepeatOrderProduct
