import NavigationItem from "./NavigationItem";
import { NavList } from "../../styles";

const NavigationList = ({
  categories,
  categoryAdvices,
  categoryClicked,
  setCategoryClicked,
  adviceClicked,
  setAdviceClicked,
  loading,
}) => {
  return (
    <NavList>
      {categories?.map((category) => (
        <NavigationItem
          loading={loading}
          key={category.id}
          category={category}
          categoryAdvices={categoryAdvices}
          categoryClicked={categoryClicked}
          setCategoryClicked={setCategoryClicked}
          opened={category.id === categoryClicked}
          adviceClicked={adviceClicked}
          setAdviceClicked={setAdviceClicked}
        />
      ))}
    </NavList>
  );
};

export default NavigationList;
