import { FC } from 'react'
import { IGroupedService } from 'src/utils/getGrupedServices'
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

interface Props {
  item: IGroupedService
}

export const CatalogItem: FC<Props> = ({ item }) => {
  return (
    <Wrapper>
      <Top>
        <Title>{item?.serviceName}</Title>
        {/* {service?.price ? (
          <Price>от {service.price}</Price>
        ) : null} */}
      </Top>
    </Wrapper>
  )
}
