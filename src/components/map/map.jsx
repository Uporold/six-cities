import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";
import { projectPropTypes } from "../../utilites/project-prop-types";

// TODO: Переделать карту под react-leaflet

const icon = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [30, 45],
});

class Map extends PureComponent {
  constructor(props) {
    super(props);
    this._map = null;

    this.mapRef = React.createRef();
  }

  _initMap() {
    this._map = leaflet.map(this.mapRef.current, {
      center: [52.38333, 4.9],
      zoom: 12,
      zoomControl: false,
      marker: true,
    });
    this._map.setView([52.38333, 4.9], 12);

    leaflet
      .tileLayer(
        `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      )
      .addTo(this._map);
  }

  _createMapPoints() {
    const { hotels } = this.props;
    /* const { location } = hotels;
    const { latitude, longitude } = location; */

    hotels.forEach((hotel) => {
      const { location } = hotel;
      const { latitude, longitude } = location;
      leaflet.marker([latitude, longitude], { icon }).addTo(this._map);
    });
  }

  componentDidMount() {
    this._initMap();
    this._createMapPoints();
  }

  componentWillUnmount() {
    this.mapRef.current.remove();
    this._map.remove();
    this._map = null;
  }

  render() {
    return (
      <section className="cities__map map">
        <div id="map" ref={this.mapRef} style={{ height: "100%" }} />
      </section>
    );
  }
}

Map.propTypes = {
  hotels: PropTypes.arrayOf(projectPropTypes.HOTEL.isRequired).isRequired,
};

export default Map;
