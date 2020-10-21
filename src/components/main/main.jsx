import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "../header/header";
import { projectPropTypes } from "../../utilites/project-prop-types";
import CitiesTabs from "../cities-tabs/cities-tabs";
import MainEmpty from "../main-empty/main-empty";
import PlacesContainer from "../places-container/places-container";
import { getHotelsSortedByCity } from "../../redux/data/selectors";
import { getCurrentCity } from "../../redux/app/selectors";

const Main = ({ hotels, currentCity }) => {
  return (
    <div
      className={`page page--gray page--main ${
        !hotels.length ? `page__main--index-empty` : ``
      }`}
    >
      <Header isMain />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesTabs />
        <div className="cities">
          {hotels.length > 0 ? (
            <PlacesContainer />
          ) : (
            <MainEmpty currentCity={currentCity} />
          )}
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  hotels: PropTypes.arrayOf(projectPropTypes.HOTEL.isRequired).isRequired,
  currentCity: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currentCity: getCurrentCity(state),
  hotels: getHotelsSortedByCity(state),
});

export { Main };
export default connect(mapStateToProps, null)(Main);
