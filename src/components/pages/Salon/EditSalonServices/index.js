import { CatalogGroup } from "./components/CatalogGroup";
import {
  Content,
  LeftColumn,
  RightColumn,
} from "../../../pages/Master/ViewMaster/components/ServicesComponent/styles";

const EditSalonServices = ({
  salonWorkplacesServicesCatalog,
  entries,
  setEntriesItems,
  entriesItems,
  mobile = false,
}) => {
  const handleDeleteEntries = (items) => {
    let newItems = entriesItems;
    for (let i = newItems.length - 1; i >= 0; i--) {
      for (let j = 0; j < items.length; j++) {
        if (newItems[i]?.id?.id === items[j]?.id) {
          newItems.splice(i, 1);
        }
      }
    }
    setEntriesItems([...newItems]);
  };

  const handleAddEntries = (items) => {
    let newItems = entriesItems;
    for (let i = newItems.length - 1; i >= 0; i--) {
      for (let j = 0; j < items.length; j++) {
        if (newItems[i]?.id?.id === items[j]?.id) {
          newItems.splice(i, 1);
        }
      }
    }
    setEntriesItems([...newItems]);
    for (let j = 0; j < items.length; j++) {
      const newItem = {
        id: { ...items[j], value: 1 },
        value: 1,
      };
      newItems.push(newItem);
    }
    setEntriesItems([...newItems]);
  };

  const groups = salonWorkplacesServicesCatalog?.groups
    ?.map((group) => {
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

export default EditSalonServices;
