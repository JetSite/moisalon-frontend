import React from "react";
import DictionaryItem from "./DictionaryItem";
import Group from "../Group";

const DictionaryGroup = ({ group, value, name: groupName, ...rest }) => {
  const { description, items = [] } = group;
  const dictionary = items.map((item) => {
    const checked = value.map((t) => t.id).indexOf(item.id) > -1;
    const itemProps = {
      ...item,
      ...rest,
      value,
      checked,
    };
    return itemProps;
  });

  return (
    <Group mbDesc={35} description={description} fullWidth={true} columns={true}>
      {dictionary.map((item, index) => {
        const name = index === 0 ? groupName : undefined;
        return <DictionaryItem {...item} name={name} key={item.id} />;
      })}
    </Group>
  );
};

export default DictionaryGroup;
