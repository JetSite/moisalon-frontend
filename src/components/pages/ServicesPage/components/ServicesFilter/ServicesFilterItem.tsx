import { FilterItemWrapper, Text, Count, Icon } from './styles'

const ServiceFilterItem = ({
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
