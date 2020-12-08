import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "../../components/header/header";
import { projectPropTypes } from "../../utilites/project-prop-types";
import CitiesTabs from "../../components/cities-tabs/cities-tabs";
import MainEmpty from "../../components/main-empty/main-empty";
import PlacesContainer from "../../components/places-container/places-container";
import { getHotelsSortedByCity } from "../../redux/data/selectors";

const Main = ({ hotels }) => {
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
          {hotels.length > 0 ? <PlacesContainer /> : <MainEmpty />}
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  hotels: PropTypes.arrayOf(projectPropTypes.HOTEL.isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  hotels: getHotelsSortedByCity(state),
});

export { Main };
export default connect(mapStateToProps, null)(Main);
