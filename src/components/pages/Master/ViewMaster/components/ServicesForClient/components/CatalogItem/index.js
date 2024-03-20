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
  width: 70%;
  color: #727272;
  flex-shrink: 0;
`

const Price = styled.p`
  font-weight: 400;
  font-size: 16px;
`

export default function CatalogItem({ item }) {
  return (
    <Wrapper>
      <Top>
        <Title>{item?.serviceName}</Title>
        {item?.price ? <Price>от {item.price}</Price> : null}
      </Top>
    </Wrapper>
  )
}
