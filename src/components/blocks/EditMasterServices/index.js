import { CatalogGroup } from "./components/CatalogGroup";
import {
  Content,
  LeftColumn,
  RightColumn,
} from "../../Master/ViewMaster/components/ServicesComponent/styles";

const EditServices = ({
  master,
  masterSpecializationsCatalog,
  entries,
  setEntriesItems,
  entriesItems,
  mobile = false,
}) => {
  const { groups: specializations = [] } = masterSpecializationsCatalog;
  const masterSpecializations = specializations.filter((t) =>
    master?.specializations.find((id) => id === t.id)
  );

  const handleDeleteEntries = (items) => {
    let newArr = entriesItems;
    for (let i = newArr.length - 1; i >= 0; i--) {
      for (let j = 0; j < items.length; j++) {
        if (newArr[i]?.id === items[j]?.id) {
          newArr.splice(i, 1);
        }
      }
    }
    setEntriesItems([...newArr]);
  };

  const handleAddEntries = (items) => {
    let newArr = entriesItems;
    for (let i = newArr.length - 1; i >= 0; i--) {
      for (let j = 0; j < items.length; j++) {
        if (newArr[i]?.id === items[j]?.id) {
          newArr.splice(i, 1);
        }
      }
    }
    setEntriesItems([...newArr]);
    for (let j = 0; j < items.length; j++) {
      newArr.push(items[j]);
    }
    setEntriesItems([...newArr]);
  };

  const groups = masterSpecializations
    .map((group) => {
      return (
        <CatalogGroup
          entriesItems={entriesItems}
          setEntriesItems={setEntriesItems}
          entries={entries}
          key={group.id}
          group={group}
          handleDeleteEntries={handleDeleteEntries}
          handleAddEntries={handleAddEntries}
        />
      );
    })
    .filter((element) => element !== null);

  const secondColumnStart = Math.round(groups.length / 2);

  return !mobile ? (
    <Content>
      <LeftColumn>{groups.slice(0, secondColumnStart)}</LeftColumn>
      <RightColumn>{groups.slice(secondColumnStart)}</RightColumn>
    </Content>
  ) : (
    <Content>{groups}</Content>
  );
};

export default EditServices;
