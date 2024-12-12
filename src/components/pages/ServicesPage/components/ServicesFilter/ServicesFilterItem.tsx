import { FC } from 'react'
import { FilterItemWrapper, Text, Count, Icon } from './styles'
import { IServiceCategory, IServiceInCategory } from 'src/types/services'

interface Props {
  item: IServiceCategory | IServiceInCategory
  clickType: string
  clickHandler: (
    type: string,
    element: IServiceCategory | IServiceInCategory,
  ) => void
  isEndElement?: boolean
  active: boolean
  withCount?: boolean
  isEmpty?: boolean
}

const ServiceFilterItem: FC<Props> = ({
  item,
  isEndElement = false,
  clickHandler,
  clickType,
  active,
  withCount = false,
  isEmpty = false,
}) => {
  return (
    <FilterItemWrapper
      isEmpty={isEmpty}
      onClick={() => clickHandler(clickType, item)}
    >
      <Text active={active}>{item?.title}</Text>
      {withCount ? (
        <Count isEndElement={isEndElement}>{item.count}</Count>
      ) : null}
      {!isEndElement ? <Icon /> : null}
    </FilterItemWrapper>
  )
}

export default ServiceFilterItem
