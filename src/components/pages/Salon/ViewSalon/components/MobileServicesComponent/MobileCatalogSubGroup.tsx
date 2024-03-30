import styled from 'styled-components'
import MobileCatalogItem from './MobileCatalogItem'
import { IGroupedService } from 'src/utils/getGrupedServices'

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 10px;
`

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`

const Title = styled.h4`
  font-weight: 500;
  font-size: 16px;
  width: 70%;
  flex-shrink: 0;
`

const Price = styled.p`
  font-weight: 400;
  font-size: 16px;
`

const ucFirst = (str: string) => {
  if (!str) return str

  return str[0].toUpperCase() + str.slice(1)
}

export default function MobileCatalogSubGroup({
  subGroup,
}: {
  subGroup: IGroupedService
}) {
  // const item = entriesItems?.find(item => item?.id === subGroup?.id)
  // const mapped = subGroup?.se
  //   ?.map((service, key) => {
  //     return (
  //       <MobileCatalogItem
  //         entriesItems={entriesItems}
  //         key={key}
  //         item={service}
  //       />
  //     )
  //   })
  //   .filter(element => element !== null)

  return (
    <Wrapper>
      <Top>
        <Title>{ucFirst(subGroup?.serviceName)}</Title>
        {/* {subGroup?.price ? <Price>от {item.price}</Price> : null} */}
      </Top>
    </Wrapper>
  )
}
