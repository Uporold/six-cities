import React from "react";
import { MapContainer, TileLayer, Marker, MapConsumer } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import { useHoveredHotelId } from "../../redux/app/hooks/selectors";
import { Hotel } from "../../utilites/types";

const createMarkerIcon = (url: string): L.Icon => {
  return new L.Icon({
    iconUrl: url,
    iconSize: [30, 45],
    iconAnchor: [15, 45],
  });
};

const icon = createMarkerIcon("/img/pin.svg");
const hoverIcon = createMarkerIcon("/img/pin-active.svg");
const testIcon = createMarkerIcon("/img/pin-current-place.svg");

interface Props {
  hotels: Array<Hotel>;
  center: number[];
  zoom: number;
  currentHotelId?: number;
}

const Map: React.FC<Props> = ({ hotels, center, zoom, currentHotelId }) => {
  const hoveredHotelId = useHoveredHotelId();

  const renderIcon = (id: number) => {
    if (currentHotelId === id) return testIcon;
    if (hoveredHotelId === id) return hoverIcon;
    return icon;
  };

  const renderMarkers = () => {
    return (
      <>
        {hotels.map((hotel, i) => (
          <Marker
            key={i}
            position={[hotel.location.latitude, hotel.location.longitude]}
            icon={renderIcon(hotel.id)}
          />
        ))}
      </>
    );
  };

  return (
    <MapContainer
      center={center as LatLngExpression}
      zoom={zoom}
      style={{ height: "100%" }}
    >
      <MapConsumer>
        {(map) => {
          map.flyTo(center as LatLngExpression, zoom);
          return null;
        }}
      </MapConsumer>
      <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
      {renderMarkers()}
    </MapContainer>
  );
};

export default Map;
