import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Map as LeafletMap, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { connect } from "react-redux";
import { projectPropTypes } from "../../utilites/project-prop-types";
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
    const { hotels, hoveredHotelId, currentHotelId } = this.props;
    return (
      <>
        {hotels.map((hotel, i) => (
          <Marker
            key={i}
            position={[hotel.location.latitude, hotel.location.longitude]}
            icon={
              currentHotelId === hotel.id
                ? testIcon
                : hoveredHotelId === hotel.id
                ? hoverIcon
                : icon
            }
          >
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
  currentHotelId: PropTypes.number,
};

Map.defaultProps = {
  hoveredHotelId: null,
  currentHotelId: null,
};

const mapStateToProps = (state) => ({
  hoveredHotelId: getHoveredHotelId(state),
});

export { Map };

export default connect(mapStateToProps, null)(Map);
