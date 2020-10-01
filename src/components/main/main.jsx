import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PlacesList from "../places-list/places-list";
import Header from "../header/header";
import { ActionCreator } from "../../redux/reducer";
import Map from "../map/map";
import { projectPropTypes } from "../../utilites/project-prop-types";
import CitiesTabs from "../cities-tabs/cities-tabs";

function Main({ hotels, hotelsByCity, currentCity, onCityClick }) {
  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesTabs currentCity={currentCity} onCityClick={onCityClick} />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {hotelsByCity.length} places to stay in {currentCity}
              </b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex="0">
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex="0"
                  >
                    Popular
                  </li>
                  <li className="places__option" tabIndex="0">
                    Price: low to high
                  </li>
                  <li className="places__option" tabIndex="0">
                    Price: high to low
                  </li>
                  <li className="places__option" tabIndex="0">
                    Top rated first
                  </li>
                </ul>
                {/*
                <select className="places__sorting-type" id="places-sorting">
                  <option
                    className="places__option"
                    value="popular"
                    selected=""
                  >
                    Popular
                  </option>
                  <option className="places__option" value="to-high">
                    Price: low to high
                  </option>
                  <option className="places__option" value="to-low">
                    Price: high to low
                  </option>
                  <option className="places__option" value="top-rated">
                    Top rated first
                  </option>
                </select>
                */}
              </form>
              <PlacesList hotels={hotelsByCity} isMain />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map hotels={hotelsByCity} center={[52.38333, 4.9]} zoom={12} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

Main.propTypes = {
  hotels: PropTypes.arrayOf(projectPropTypes.HOTEL.isRequired).isRequired,
  hotelsByCity: PropTypes.arrayOf(projectPropTypes.HOTEL.isRequired).isRequired,
  currentCity: PropTypes.string.isRequired,
  onCityClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentCity: state.currentCity,
  hotelsByCity: state.hotelsByCity,
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick(city) {
    dispatch(ActionCreator.getHotels(city));
    dispatch(ActionCreator.setCity(city));
  },
});

export { Main };
export default connect(mapStateToProps, mapDispatchToProps)(Main);
