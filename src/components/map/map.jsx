import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Map as LeafletMap, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { usePrevious } from "../../utilites/util";
import {
  useCurrentCity,
  useHoveredHotelId,
} from "../../redux/app/hooks/selectors";
import { projectPropTypes } from "../../utilites/project-prop-types";

const createMarkerIcon = (url) => {
  return new L.Icon({
    iconUrl: url,
    iconSize: [30, 45],
    iconAnchor: [15, 45],
  });
};

const icon = createMarkerIcon("/img/pin.svg");
const hoverIcon = createMarkerIcon("/img/pin-active.svg");
const testIcon = createMarkerIcon("/img/pin-current-place.svg");

const Map = ({ hotels, center, zoom, currentHotelId }) => {
  const mapInstance = useRef();
  const currentCity = useCurrentCity();
  const hoveredHotelId = useHoveredHotelId();
  const previousValue = usePrevious({ currentCity, currentHotelId, center });
  useEffect(() => {
    const map = mapInstance.current.leafletElement;
    if (
      previousValue &&
      (previousValue.currentCity !== previousValue ||
        currentHotelId !== previousValue.currentHotelId)
    ) {
      map.flyTo(center, zoom);
    }
  });

  const renderIcon = (id) => {
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
    <LeafletMap
      ref={mapInstance}
      center={previousValue ? previousValue.center : center}
      zoom={zoom}
      style={{ height: "100%" }}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
      {renderMarkers()}
    </LeafletMap>
  );
};

Map.propTypes = {
  hotels: PropTypes.arrayOf(projectPropTypes.HOTEL.isRequired).isRequired,
  center: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  zoom: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  currentHotelId: PropTypes.number,
};

Map.defaultProps = {
  currentHotelId: null,
};

export default Map;
