import { useMemo } from "react";

const useServiceCatalogValues = (serviceCatalog, values) => {
  const { groups } = serviceCatalog;
  const initialServices = useMemo(() => {
    return groups
      .map(({ items = [] }) => items)
      .reduce((prev, cur) => {
        return [...prev, ...(cur || [])];
      }, [])
      .map(({ id }) => ({
        id,
        value: values?.find((v) => id === v) !== undefined ? 1 : 0,
      }));
  }, [groups, values]);

  return initialServices;
};

export default useServiceCatalogValues;
