import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Sorting from "../sorting/sorting";
import PlacesList from "../places-list/places-list";
import Map from "../map/map";
import { getHotelsByCity, getSortedHotels } from "../../utilites/util";
import { projectPropTypes } from "../../utilites/project-prop-types";
import NameSpace from "../../redux/name-space";

const PlacesContainer = ({ hotels, currentSortType, currentCity }) => {
  const hotelsByCity = getHotelsByCity(hotels, currentCity);
  const center = [
    hotelsByCity[0].city.location.latitude,
    hotelsByCity[0].city.location.longitude,
  ];
  const zoom = [hotelsByCity[0].city.location.zoom];
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
          <Map hotels={hotelsByCity} center={center} zoom={zoom} />
        </section>
      </div>
    </div>
  );
};

PlacesContainer.propTypes = {
  hotels: PropTypes.arrayOf(projectPropTypes.HOTEL.isRequired).isRequired,
  currentCity: PropTypes.string.isRequired,
  currentSortType: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currentSortType: state[NameSpace.APP].currentSortType,
  currentCity: state[NameSpace.APP].currentCity,
  hotels: state[NameSpace.DATA].hotels,
});

export { PlacesContainer };
export default connect(mapStateToProps, null)(PlacesContainer);
