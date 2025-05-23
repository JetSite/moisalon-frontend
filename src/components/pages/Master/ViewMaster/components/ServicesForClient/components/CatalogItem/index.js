import { formatServicePrice } from '@/utils/formatServicePrice'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 5px;
`

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`

const Title = styled.h4`
  font-weight: 500;
  font-size: 16px;
  color: #727272;
`

const Price = styled.p`
  font-weight: 400;
  font-size: 16px;
`

export default function CatalogItem({ item }) {
  const priceText = formatServicePrice(item)
  
  return (
    <Wrapper>
      <Top>
        <Title>{item?.serviceName ?? item?.service?.title}</Title>
        {priceText ? (
          <Price>
            {priceText}
          </Price>
        ) : null}
      </Top>
    </Wrapper>
  )
}
