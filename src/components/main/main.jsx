import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PlacesList from "../places-list/places-list";
import Header from "../header/header";
import { ActionCreator } from "../../redux/reducer";
import Map from "../map/map";
import { projectPropTypes } from "../../utilites/project-prop-types";
import CitiesTabs from "../cities-tabs/cities-tabs";
import Sorting from "../sorting/sorting";
import { getSortedHotels } from "../../utilites/util";

const Main = ({
  hotels,
  hotelsByCity,
  currentCity,
  onCityClick,
  onSortingTabClick,
  currentSortType,
}) => {
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
              <Sorting
                onSortingTabClick={onSortingTabClick}
                currentSortType={currentSortType}
              />
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
};

Main.propTypes = {
  hotels: PropTypes.arrayOf(projectPropTypes.HOTEL.isRequired).isRequired,
  hotelsByCity: PropTypes.arrayOf(projectPropTypes.HOTEL.isRequired).isRequired,
  currentCity: PropTypes.string.isRequired,
  onCityClick: PropTypes.func.isRequired,
  onSortingTabClick: PropTypes.func.isRequired,
  currentSortType: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currentCity: state.currentCity,
  hotelsByCity: getSortedHotels(state.hotelsByCity, state.currentSortType),
  currentSortType: state.currentSortType,
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick(city) {
    dispatch(ActionCreator.setCity(city));
    dispatch(ActionCreator.getHotels(city));
    dispatch(ActionCreator.setDefaultSortType());
  },
  onSortingTabClick(sortType) {
    dispatch(ActionCreator.setSort(sortType));
  },
});

export { Main };
export default connect(mapStateToProps, mapDispatchToProps)(Main);
