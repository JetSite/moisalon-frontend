import React from "react";
import { FieldArray } from "react-final-form-arrays";
import Group from "../Group";
import ServiceCatalogArray from "../ServiceCatalogArray";

const ServiceCatalogField = ({
  serviceCatalog,
  name,
  withButton = false,
  fullWidth = false,
  align = "",
  columns = false,
}) => {
  const groupProps = {
    fullWidth,
    withButton,
    align,
    columns,
  };

  return (
    <Group {...groupProps}>
      <FieldArray name={name}>
        {(arrayField) => (
          <ServiceCatalogArray
            {...arrayField}
            serviceCatalog={serviceCatalog}
          />
        )}
      </FieldArray>
    </Group>
  );
};

export default ServiceCatalogField;
