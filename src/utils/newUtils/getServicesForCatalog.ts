import { IServiceCategories, IServiceInForm } from 'src/types/services'

type IGetServicesForCatalog = (
  services: IServiceCategories[] | null,
) => IServiceInForm[]

export const getServicesForCatalog: IGetServicesForCatalog = services => {
  if (!services || !services.length) return []
  return services?.map(({ id, title, services: insideServices }) => ({
    id,
    description: title,
    items: insideServices?.map(({ id, title }) => ({
      groupName: title,
      title: title,
      id,
    })),
  }))
}
