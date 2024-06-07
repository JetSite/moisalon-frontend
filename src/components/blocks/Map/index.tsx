import { useRef, useEffect, useState, Ref } from 'react'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'
import { Map as YandexMap } from 'yandex-maps'

interface Props {
  address: { latitude?: number; longitude?: number }
  view?: boolean
}

export default function MapBlock({ address, view }: Props) {
  const mapRef = useRef<YandexMap | null>(null)
  const mapData = {
    center: [address.latitude || 55.751267, address.longitude || 37.621226],
    zoom: 15,
    behaviors: ['default', 'scrollZoom'],
  }

  useEffect(() => {
    if (view) {
      if (mapRef.current && address.latitude && address.longitude) {
        mapRef.current.setCenter([address.latitude, address.longitude])
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
