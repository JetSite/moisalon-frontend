import React, { useCallback, useState, useEffect, useRef } from "react";
import { FieldArray } from "react-final-form-arrays";
import ArrayItem from "./ArrayItem";
import Button from "../../../ui/Button";

const AddComponentWrapper = ({ fields, initialValues, onAdd, title }) => {
  const [disabled, setDisabled] = useState(false);
  const onChange = useCallback(
    (ev) => {
      ev.preventDefault();

      if (!disabled) {
        onAdd();
        fields.push(initialValues);
      }
      setDisabled(true);
    },
    [disabled, fields, onAdd, initialValues]
  );

  useEffect(() => {
    if (disabled) {
      const timeout = setTimeout(() => setDisabled(false));
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [disabled, fields, initialValues]);

  return (
    <Button
      onClick={onChange}
      variant="withRoundBorder"
      size="round265"
      font="roundMedium"
      mt="40"
    >
      Добавить {title}
    </Button>
  );
};

const AutoFocusedArrayField = ({
  name,
  fieldComponent: FieldComponent,
  initialValues,
  title,
}) => {
  const pristine = useRef(true);
  const onAdd = useCallback(() => {
    pristine.current = false;
  }, []);

  return (
    <FieldArray name={name}>
      {({ fields }) => {
        const itemList = fields.map((name, index) => {
          const itemProps = {
            name,
            index,
            remove: fields.remove,
            fieldComponent: FieldComponent,
            key: name,
            isLast: index === fields.length - 1,
            pristine: pristine.current,
            title: title,
          };
          return <ArrayItem {...itemProps} />;
        });
        return (
          <>
            {itemList}
            <AddComponentWrapper
              fields={fields}
              initialValues={initialValues}
              onAdd={onAdd}
              title={title}
            />
          </>
        );
      }}
    </FieldArray>
  );
};

export default AutoFocusedArrayField;
