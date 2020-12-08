import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Map as LeafletMap, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { connect } from "react-redux";
import { projectPropTypes } from "../../utilites/project-prop-types";
import { getCurrentCity, getHoveredHotelId } from "../../redux/app/selectors";

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
  constructor(props) {
    super(props);
    this.defaultCenter = props.center;
  }

  componentDidMount() {
    this.map = this.mapInstance.leafletElement;
  }

  componentDidUpdate(prevProps) {
    const { center, currentCity, zoom, currentHotelId } = this.props;
    if (
      currentCity !== prevProps.currentCity ||
      currentHotelId !== prevProps.currentHotelId
    ) {
      this.map.flyTo(center, zoom);
    }
  }

  renderIcon(id) {
    const { hoveredHotelId, currentHotelId } = this.props;
    if (currentHotelId === id) return testIcon;
    if (hoveredHotelId === id) return hoverIcon;
    return icon;
  }

  renderMarkers() {
    const { hotels } = this.props;
    return (
      <>
        {hotels.map((hotel, i) => (
          <Marker
            key={i}
            position={[hotel.location.latitude, hotel.location.longitude]}
            icon={this.renderIcon(hotel.id)}
          />
        ))}
      </>
    );
  }

  render() {
    const { zoom } = this.props;
    return (
      <LeafletMap
        ref={(mapEl) => (this.mapInstance = mapEl)}
        center={this.defaultCenter}
        zoom={zoom}
        style={{ height: "100%" }}
      >
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
  currentCity: PropTypes.string.isRequired,
};

Map.defaultProps = {
  hoveredHotelId: null,
  currentHotelId: null,
};

const mapStateToProps = (state) => ({
  hoveredHotelId: getHoveredHotelId(state),
  currentCity: getCurrentCity(state),
});

export { Map };

export default connect(mapStateToProps, null)(Map);
