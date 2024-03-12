import React from "react";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import PhotoArray from "./PhotoArray";

const PhotoArrayField = ({
  variant = "normal",
  kind,
  photoType,
  description,
}) => {
  return (
    <Field name="defaultPhotoId">
      {({ input }) => {
        const { value: defaultPhotoId, onChange: onSetDefault } = input;
        return (
          <FieldArray name="photos">
            {({ fields }) => {
              const {
                value = [],
                remove: onRemove,
                update: onChange,
                insert: onAdd,
              } = fields;
              const photoProps = {
                kind,
                photoType,
                photos: value,
                defaultPhotoId,
                onSetDefault,
                onAdd,
                onRemove,
                onChange,
              };
              return (
                <PhotoArray
                  variant={variant}
                  {...photoProps}
                  description={description}
                />
              );
            }}
          </FieldArray>
        );
      }}
    </Field>
  );
};

export default PhotoArrayField;
