import { IBrand } from 'src/types/brands'
import { isArray } from '../flattenStrapiResponse'

export type ICoordinate = [number, number]

export type IGetMapCoordinates = (
  brands: IBrand[],
) => [ICoordinate[], ymaps.IMapState]

export const getMapCoordinates: IGetMapCoordinates = brands => {
  let mapData: ymaps.IMapState = {
    center: [55.751574, 37.573856],
    zoom: 5,
    behaviors: ['default', 'scrollZoom'],
  }
  if (!isArray(brands) && !brands.length) return [[], mapData]
  const coordinates = brands
    .filter(
      brand =>
        typeof brand.latitude === 'number' &&
        typeof brand.longitude === 'number' &&
        brand.latitude >= -90 &&
        brand.latitude <= 90 &&
        brand.longitude >= -180 &&
        brand.longitude <= 180,
    )
    .map(brand => [brand.latitude, brand.longitude] as ICoordinate)

  if (coordinates.length) {
    mapData = {
      center: coordinates[0],
      zoom: 10,
      behaviors: ['default', 'scrollZoom'],
    }
  }
  return [coordinates, mapData]
}
