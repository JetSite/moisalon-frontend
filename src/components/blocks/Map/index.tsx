import { useRef, useEffect, useState, Ref } from 'react'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'
import { Map as YandexMap } from 'yandex-maps'

interface Props {
  address: { latitude?: number | string; longitude?: number | string }
  view?: boolean
}

export default function MapBlock({ address, view }: Props) {
  if (!address) return <></>
  const mapRef = useRef<YandexMap | null>(null)
  let center = [55.751267, 37.621226]
  if (
    typeof Number(address?.latitude) === 'number' ||
    typeof Number(address.longitude) === 'number'
  ) {
    center = [Number(address?.latitude), Number(address?.longitude)]
  }
  const mapData = {
    center,
    zoom: 15,
    behaviors: ['default', 'scrollZoom'],
  }

  useEffect(() => {
    if (view) {
      if (mapRef.current && address.latitude && address.longitude) {
        mapRef.current.setCenter(center)
      }
    }
  }, [address, view])

  return (
    <YMaps>
      <div
        style={{
          marginBottom: 24,
          overflow: 'hidden',
          flexShrink: 0,
          width: '100%',
        }}
      >
        <Map
          instanceRef={instance => {
            mapRef.current = instance
          }}
          width="100%"
          defaultState={mapData}
        >
          {address.latitude && address.longitude && view && (
            <Placemark geometry={[address.latitude, address.longitude]} />
          )}
        </Map>
      </div>
    </YMaps>
  )
}
