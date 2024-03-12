import { CatalogGroup } from "./components/CatalogGroup";
import {
  Content,
  LeftColumn,
  RightColumn,
} from "../../../pages/Master/ViewMaster/components/ServicesComponent/styles";

const EditSalonServices = ({
  salonServicesMasterCatalog,
  setEntriesItems,
  entriesItems,
  mobile = false,
  services,
  masterPage,
}) => {
  const handleDeleteEntries = (group) => {
    let newItems = entriesItems;
    for (let i = 0; i < group?.subGroups?.length; i++) {
      newItems = newItems?.filter(
        (entry) => entry.id !== group?.subGroups[i]?.id
      );
      newItems = newItems?.filter((entry) => entry.id !== group?.id);
      if (group?.subGroups[i]?.items?.length) {
        for (let j = 0; j < group?.subGroups[i]?.items?.length; j++) {
          newItems = newItems?.filter(
            (entry) => entry.id !== group?.subGroups[i]?.items[j]?.id
          );
          newItems = newItems?.filter((entry) => entry.id !== group?.id);
        }
      }
    }
    setEntriesItems([...newItems]);
  };

  const handleAddEntries = (group) => {
    let newItems = entriesItems;
    for (let i = 0; i < group?.subGroups?.length; i++) {
      if (!newItems.find((item) => item?.id === group?.subGroups[i]?.id)) {
        const service = services?.find(
          (el) => el?.id === group?.subGroups[i]?.id
        );
        const item = entriesItems?.find(
          (item) => item?.id === group?.subGroups[i]?.id
        );
        const newItem = {
          id: group?.subGroups[i]?.id,
          price: service?.price || item?.price || 0,
        };
        newItems.push(newItem);
      }
      if (group?.subGroups[i]?.items?.length) {
        for (let j = 0; j < group?.subGroups[i]?.items?.length; j++) {
          if (
            !newItems.find(
              (item) => item?.id === group?.subGroups[i]?.items[j]?.id
            )
          ) {
            const item = entriesItems?.find(
              (item) => item?.id === group?.subGroups[i]?.items[j]?.id
            );
            const service = services?.find(
              (el) => el?.id === group?.subGroups[i]?.items[j]?.id
            );
            const newItem = {
              id: group?.subGroups[i]?.items[j]?.id,
              price: service?.price || item?.price || 0,
            };
            newItems.push(newItem);
          }
        }
      }
    }
    setEntriesItems([...newItems]);
  };

  const groups = salonServicesMasterCatalog?.groups?.map((group, idx) => {
    return (
      <CatalogGroup
        entriesItems={entriesItems}
        setEntriesItems={setEntriesItems}
        key={idx}
        group={group}
        services={services}
        handleDeleteEntries={handleDeleteEntries}
        handleAddEntries={handleAddEntries}
      />
    );
  });

  const secondColumnStart = Math.round(groups.length / 2);
  return !mobile ? (
    <Content>
      <LeftColumn>{groups.slice(0, secondColumnStart)}</LeftColumn>
      <RightColumn>{groups.slice(secondColumnStart)}</RightColumn>
    </Content>
  ) : (
    <Content masterPage={masterPage}>{groups}</Content>
  );
};

export default EditSalonServices;
