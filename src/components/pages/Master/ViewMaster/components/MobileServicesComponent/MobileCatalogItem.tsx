import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../../styles/variables'
import { FC } from 'react'
import { IServices } from 'src/types/services'

const Wrapper = styled.div<{ masterPage?: boolean }>`
  width: 100%;
  margin-bottom: 5px;
  border-bottom: ${props => (props.masterPage ? '1px solid #e2e2e2' : 'none')};
  padding-bottom: ${props => (props.masterPage ? '5px' : '0')};
  @media (max-width: ${laptopBreakpoint}) {
    border-bottom: none;
    padding-bottom: 0;
  }
`

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`

const Title = styled.h4`
  font-weight: 500;
  font-size: 14px;
  width: 50%;
  color: #727272;
  flex-shrink: 0;
`

const Price = styled.p`
  font-weight: 400;
  font-size: 14px;
`
interface IMobileCatalogItem {
  item: IServices
  masterPage?: boolean
}

const MobileCatalogItem: FC<IMobileCatalogItem> = ({ item, masterPage }) => {
  return (
    <Wrapper masterPage={masterPage}>
      <Top>
        <Title>{item?.service?.title}</Title>
        {item?.priceFrom ? (
          <Price>
            от {item.priceFrom} {item.unitOfMeasurement}
          </Price>
        ) : null}
      </Top>
    </Wrapper>
  )
}

export default MobileCatalogItem
