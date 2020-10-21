import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Sorting from "../sorting/sorting";
import PlacesList from "../places-list/places-list";
import Map from "../map/map";
import { projectPropTypes } from "../../utilites/project-prop-types";
import { getCurrentCity, getCurrentSortType } from "../../redux/app/selectors";
import {
  getHotelsSortedByForm,
  getHotelsSortedByCity,
} from "../../redux/data/selectors";

const PlacesContainer = ({
  hotelsByCity,
  sortedHotels,
  currentSortType,
  currentCity,
}) => {
  const center = [
    hotelsByCity[0].city.location.latitude,
    hotelsByCity[0].city.location.longitude,
  ];
  const zoom = [hotelsByCity[0].city.location.zoom];
  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {hotelsByCity.length} places to stay in {currentCity}
        </b>
        <Sorting currentSortType={currentSortType} />
        <PlacesList hotels={sortedHotels} isMain />
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map hotels={hotelsByCity} center={center} zoom={zoom} />
        </section>
      </div>
    </div>
  );
};

PlacesContainer.propTypes = {
  hotelsByCity: PropTypes.arrayOf(projectPropTypes.HOTEL.isRequired).isRequired,
  sortedHotels: PropTypes.arrayOf(projectPropTypes.HOTEL.isRequired).isRequired,
  currentCity: PropTypes.string.isRequired,
  currentSortType: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currentSortType: getCurrentSortType(state),
  currentCity: getCurrentCity(state),
  hotelsByCity: getHotelsSortedByCity(state),
  sortedHotels: getHotelsSortedByForm(state),
});

export { PlacesContainer };
export default connect(mapStateToProps, null)(PlacesContainer);
