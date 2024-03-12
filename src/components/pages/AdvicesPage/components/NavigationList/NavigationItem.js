import CategoryAdvicesList from "../CategoryAdvicesList";
import { NavItem, Text, Icon } from "../../styles";

const NavigationItem = ({
  category,
  categoryAdvices,
  categoryClicked,
  setCategoryClicked,
  opened,
  adviceClicked,
  setAdviceClicked,
  loading,
}) => {

  const itemClickHandler = () => {
    setAdviceClicked("");
    setCategoryClicked(category.id !== categoryClicked ? category.id : "");
  };

  const editedTitle =
    category.title.charAt(0).toUpperCase() + category.title.slice(1);

  return (
    <>
      <NavItem onClick={itemClickHandler}>
        <Text>{editedTitle}</Text>
        <Icon opened={opened} />
      </NavItem>
      {opened && !loading ? (
        <CategoryAdvicesList
          categoryAdvices={categoryAdvices}
          adviceClicked={adviceClicked}
          setAdviceClicked={setAdviceClicked}
        />
      ) : null}
    </>
  );
};

export default NavigationItem;
