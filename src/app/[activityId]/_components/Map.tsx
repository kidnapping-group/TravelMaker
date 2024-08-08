import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useState } from "react";

const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
};

function Map({ address }: { address: string }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY || "",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback(
    (mapInstance: google.maps.Map) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        { address },
        (results: google.maps.GeocoderResult[] | null, status: google.maps.GeocoderStatus) => {
          if (status === "OK" && results && results[0]) {
            const bounds = new google.maps.LatLngBounds(results[0].geometry.location);
            mapInstance.fitBounds(bounds);
            setMap(mapInstance);
          }
        },
      );
    },
    [address],
  );

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const mapOptions: google.maps.MapOptions = {
    zoom: 17,
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    draggable: true,
    keyboardShortcuts: false,
    panControl: true,
    gestureHandling: "greedy",
  };

  return (
    isLoaded && (
      <div className="h-[450px] w-full tablet:h-72 pc:h-[450px]">
        <GoogleMap
          mapContainerStyle={containerStyle}
          options={mapOptions}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {map &&
            (() => {
              const center = map.getCenter();
              return center ? <Marker position={center} /> : null;
            })()}
        </GoogleMap>
      </div>
    )
  );
}

export default Map;
