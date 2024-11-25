import { FC, useRef, useState } from 'react'
import { BrandsAddressWrap, BrandsAddresses, MapWrapper } from '../styles'
import { IBrand } from 'src/types/brands'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'
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
          <Map
            instanceRef={mapRef}
            width="100%"
            defaultState={mapData}
            onLoad={() => setLoading(false)}
          >
            {coordinates.map((coordinate, i) => (
              <Placemark key={i} geometry={coordinate} />
            ))}
          </Map>
        </YMaps>
      </MapWrapper>
    </>
  )
}

export default BrandAddress
