import { FC, useRef, useState } from 'react'
import { BrandsAddressWrap, BrandsAddresses, MapWrapper } from '../styles'
import { IBrand } from 'src/types/brands'
import { YMaps, Map as YMapsMap, Placemark } from '@pbe/react-yandex-maps'
import { getMapCoordinates } from 'src/utils/newUtils/getMapCoordinates'

interface Props {
  brands: IBrand[]
}

const BrandAddress: FC<Props> = ({ brands }) => {
  const [loading, setLoading] = useState(true)
  const mapRef = useRef<ymaps.Map>()
  const [coordinates, mapData] = getMapCoordinates(brands)

  return (
    <>
      {brands.length ? (
        <BrandsAddresses>
          {brands?.map(brand => (
            <BrandsAddressWrap key={brand.id}>
              {brand.name}
              <br />
              {brand.address}
            </BrandsAddressWrap>
          ))}
        </BrandsAddresses>
      ) : null}
      <MapWrapper loading={loading}>
        <YMaps>
          <YMapsMap
            instanceRef={mapRef}
            width="100%"
            defaultState={mapData}
            onLoad={() => setLoading(false)}
            onError={error => {
              setLoading(false)
              console.error('Map loading failed:', error)
            }}
          >
            {coordinates.map((coordinate, i) => (
              <Placemark
                key={`${coordinate[0]}-${coordinate[1]}`}
                geometry={coordinate}
              />
            ))}
          </YMapsMap>
        </YMaps>
      </MapWrapper>
    </>
  )
}

export default BrandAddress
