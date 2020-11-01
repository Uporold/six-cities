import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { connect } from "react-redux";
import { projectPropTypes } from "../../utilites/project-prop-types";
import PlaceCard from "../place-card/place-card";
import { getHoveredHotelId } from "../../redux/app/selectors";

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

class Map extends PureComponent {
  renderMarkers() {
    const { hotels, hoveredHotelId, currentHotel } = this.props;
    return (
      <>
        {hotels.map((hotel) => (
          <Marker
            position={[hotel.location.latitude, hotel.location.longitude]}
            icon={
              currentHotel.id === hotel.id
                ? testIcon
                : hoveredHotelId === hotel.id
                ? hoverIcon
                : icon
            }
          >
            <Popup>
              <PlaceCard
                hotel={hotel}
                onPlaceCardClick={() => {}}
                onHover={() => {}}
                onHotelCardOut={() => {}}
              />
            </Popup>
          </Marker>
        ))}
      </>
    );
  }

  render() {
    const { center, zoom } = this.props;
    return (
      <LeafletMap center={center} zoom={zoom} style={{ height: "100%" }}>
        <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
        {this.renderMarkers()}
      </LeafletMap>
    );
  }
}

Map.propTypes = {
  hotels: PropTypes.arrayOf(projectPropTypes.HOTEL.isRequired).isRequired,
  center: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  zoom: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  hoveredHotelId: PropTypes.number,
  currentHotel: projectPropTypes.HOTEL,
};

Map.defaultProps = {
  hoveredHotelId: null,
  currentHotel: {},
};

const mapStateToProps = (state) => ({
  hoveredHotelId: getHoveredHotelId(state),
});

export { Map };

export default connect(mapStateToProps, null)(Map);
