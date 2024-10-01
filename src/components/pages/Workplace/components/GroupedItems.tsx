import { FC } from 'react'
import * as Styled from '../styles'
import { IEquipment } from 'src/types/equipment'
import { IGroupedItems } from 'src/utils/newUtils/getCategotisedItems'
import { IService } from 'src/types/services'

interface Props {
  data: IGroupedItems<IService | IEquipment>[]
  title: string
}

export const GroupedItems: FC<Props> = ({ data, title }) => {
  return (
    <>
      <Styled.Title>{title}</Styled.Title>
      {data.map(group => (
        <Styled.InfoItemHorisontal key={group.id}>
          <Styled.InfoItemTitleWide>{group.title}</Styled.InfoItemTitleWide>
          <Styled.InfoItemContent>
            {group.items.map(service => {
              return (
                <Styled.ItemWide key={service.id}>
                  <Styled.IconCircle src="/service-rent-icon.svg" />
                  <Styled.Text>{service.title}</Styled.Text>
                  {/* {service.serviceDetail.includes('шт.') ||
              service.quantity > 1 ? ( */}
                  {/* <Styled.Text>- {service.title}</Styled.Text> */}
                  {/* ) : null} */}
                </Styled.ItemWide>
              )
            })}
          </Styled.InfoItemContent>
        </Styled.InfoItemHorisontal>
      ))}
    </>
  )
}
