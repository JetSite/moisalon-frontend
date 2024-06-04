import { IServiceCategories, IServiceInForm } from 'src/types/services'

type IGetServicesForCatalog = (
  services: IServiceCategories[] | null,
) => IServiceInForm[]

export const getServicesForCatalog: IGetServicesForCatalog = services => {
  if (!services || !services.length) return []
  return services?.map(
    ({ id, serviceCategoryName, services: insideServices }) => ({
      id,
      description: serviceCategoryName,
      items: insideServices?.map(({ id, serviceName }) => ({
        groupName: serviceName,
        title: serviceName,
        id,
      })),
    }),
  )
}
