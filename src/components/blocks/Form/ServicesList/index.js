import ServiceCatalogField from "../ServiceCatalogField";

const ServicesList = ({ serviceCatalog, specializations }) => {
  const catalog = {
    ...serviceCatalog,
    groups: specializations,
  };

  return (
    <div id="services">
      <ServiceCatalogField
        name="specializationsServices"
        fullWidth={true}
        serviceCatalog={catalog}
      />
    </div>
  );
};

export default ServicesList;
