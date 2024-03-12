import { useRef, useEffect, useState } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";

export default function MapBlock({ address }) {
  const mapRef = useRef(null);
  const [ymaps, setYmaps] = useState(null);
  const mapData = {
    center: [address.latitude || 55.751267, address.longitude || 37.621226],
    zoom: 15,
    behaviors: ["default", "scrollZoom"],
  };

  useEffect(() => {
    if (ymaps && mapRef?.current?.geoObjects?.getBounds()) {
      const map = mapRef?.current?.geoObjects?.getMap();
      if (address?.longitude && address?.latitude) {
        map?.setCenter([address.latitude, address.longitude]);
      }
    }
  }, [address]);

  const onLoad = (ymaps) => {
    setYmaps(ymaps);
  };

  return (
    <YMaps>
      <div
        style={{
          marginBottom: 24,
          overflow: "hidden",
          flexShrink: 0,
          width: "100%",
        }}
      >
        <Map
          onLoad={onLoad}
          instanceRef={mapRef}
          width="100%"
          defaultState={mapData}
        >
          <Placemark geometry={[address.latitude, address.longitude]} />
        </Map>
      </div>
    </YMaps>
  );
}
