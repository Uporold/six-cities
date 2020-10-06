import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Sorting from "../sorting/sorting";
import PlacesList from "../places-list/places-list";
import Map from "../map/map";
import { getSortedHotels } from "../../utilites/util";
import { projectPropTypes } from "../../utilites/project-prop-types";

const coord = [52.38333, 4.9];
const zoom = 12;

const PlacesContainer = ({ hotelsByCity, currentSortType, currentCity }) => {
  const sortedHotels =
    hotelsByCity.length > 1
      ? getSortedHotels(hotelsByCity, currentSortType)
      : hotelsByCity;
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
          <Map hotels={hotelsByCity} center={coord} zoom={zoom} />
        </section>
      </div>
    </div>
  );
};

PlacesContainer.propTypes = {
  hotelsByCity: PropTypes.arrayOf(projectPropTypes.HOTEL.isRequired).isRequired,
  currentCity: PropTypes.string.isRequired,
  currentSortType: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currentCity: state.currentCity,
  hotelsByCity: state.hotelsByCity,
  currentSortType: state.currentSortType,
});

export { PlacesContainer };
export default connect(mapStateToProps, null)(PlacesContainer);
