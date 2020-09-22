import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import { projectPropTypes } from "../../utilites/project-prop-types";
import PlaceCard from "../place-card/place-card";

class Map extends PureComponent {
  renderMarkers() {
    const { hotels } = this.props;
    return (
      <>
        {hotels.map((hotel) => (
          <Marker
            position={[hotel.location.latitude, hotel.location.longitude]}
          >
            <Popup>
              <PlaceCard
                hotel={hotel}
                onPlaceCardClick={() => {}}
                onHover={() => {}}
              />
            </Popup>
          </Marker>
        ))}
      </>
    );
  }

  render() {
    return (
      <section className="cities__map map">
        <LeafletMap
          center={[52.38333, 4.9]}
          zoom={12}
          style={{ height: "100%" }}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
          {this.renderMarkers()}
        </LeafletMap>
      </section>
    );
  }
}

Map.propTypes = {
  hotels: PropTypes.arrayOf(projectPropTypes.HOTEL.isRequired).isRequired,
};

export default Map;
