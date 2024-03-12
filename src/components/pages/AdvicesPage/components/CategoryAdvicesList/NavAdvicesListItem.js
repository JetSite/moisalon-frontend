import { NavAdviceItem } from "../../styles";

const NavAdvicesListItem = ({ item, active, setAdviceClicked }) => {
  const editedTitle =
    item.title.charAt(0).toUpperCase() + item.title.slice(1).toLowerCase();

  return (
    <NavAdviceItem onClick={() => setAdviceClicked(item.id)} active={active}>
      {editedTitle}
    </NavAdviceItem>
  );
};

export default NavAdvicesListItem;
