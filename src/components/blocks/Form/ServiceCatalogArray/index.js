import React from "react";
import CatalogGroup from "../CatalogGroup";

const ServiceCatalogArray = ({ serviceCatalog, ...other }) => {
  const { groups = [] } = serviceCatalog;
  return (
    <>
      {groups.map((group) => {
        return <CatalogGroup key={group.id} {...other} group={group} />;
      })}
    </>
  );
};

export default ServiceCatalogArray;
