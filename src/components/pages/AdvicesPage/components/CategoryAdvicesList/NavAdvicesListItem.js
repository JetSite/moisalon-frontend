import { NavAdviceItem } from '../../styles'

const NavAdvicesListItem = ({ item, active, setAdviceClicked }) => {
  const editedTitle =
    item.attributes.beautyFeedTitle.charAt(0).toUpperCase() +
    item.attributes.beautyFeedTitle.slice(1).toLowerCase()

  return (
    <NavAdviceItem onClick={() => setAdviceClicked(item.id)} active={active}>
      {editedTitle}
    </NavAdviceItem>
  )
}

export default NavAdvicesListItem
