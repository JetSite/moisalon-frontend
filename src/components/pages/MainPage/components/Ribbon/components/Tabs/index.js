import { Wrapper, Content, Item, Text } from './styles'

const Tabs = ({ tabs, activeTab, changeActiveTab }) => {
  return (
    <Wrapper>
      {tabs?.map(item => (
        <Item
          active={item.id === activeTab}
          onClick={() => changeActiveTab(item.id)}
          key={item.id}
        >
          <Text>{item?.title}</Text>
        </Item>
      ))}
    </Wrapper>
  )
}

export default Tabs
