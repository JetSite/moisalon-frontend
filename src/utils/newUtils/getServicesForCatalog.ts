import { IServiceCategories, IServiceInForm } from 'src/types/services'

type IGetServicesForCatalog = (
  services: IServiceCategories[] | null,
) => IServiceInForm[]

export const getServicesForCatalog: IGetServicesForCatalog = services => {
  if (!services || services.length === 0) return []

  return services.map(({ id, title, services, services_m }) => {
    const insideServices = services || services_m || []
    return {
      id,
      description: title,
      items: insideServices.length
        ? insideServices.map(({ id, title }) => ({
            groupName: title,
            title: title,
            id,
          }))
        : [],
    }
  })
}
