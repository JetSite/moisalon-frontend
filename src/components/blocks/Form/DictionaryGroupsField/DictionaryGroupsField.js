import React from "react";
import DictionaryGroup from "./DictionaryGroup";
import { FieldArray } from "react-final-form-arrays";

const DictionaryGroupsField = ({ name, groups = [] }) => {
  return (
    <FieldArray name={name}>
      {arrayField => {
        const {
          fields: { value = [], push, remove }
        } = arrayField;
        const groupControls = groups.map(group => {
          const { id, ...rest } = group;
          const groupProps = {
            group: { ...rest },
            value,
            push,
            remove,
            name
          };
          return <DictionaryGroup {...groupProps} key={group.id} />;
        });
        return groupControls;
      }}
    </FieldArray>
  );
};

export default DictionaryGroupsField;
