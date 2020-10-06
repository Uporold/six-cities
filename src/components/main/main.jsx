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
import MainEmpty from "../main-empty/main-empty";

const Main = ({
  hotelsByCity,
  currentCity,
  onCityClick,
  onSortingTabClick,
  currentSortType,
}) => {
  const sortedHotels =
    hotelsByCity.length > 1
      ? getSortedHotels(hotelsByCity, currentSortType)
      : hotelsByCity;

  return (
    <div
      className={`page page--gray page--main ${
        !hotelsByCity.length ? `page__main--index-empty` : ``
      }`}
    >
      <Header isMain />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesTabs currentCity={currentCity} onCityClick={onCityClick} />
        <div className="cities">
          {hotelsByCity.length > 0 ? (
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
                <PlacesList hotels={sortedHotels} isMain />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map
                    hotels={hotelsByCity}
                    center={[52.38333, 4.9]}
                    zoom={12}
                  />
                </section>
              </div>
            </div>
          ) : (
            <MainEmpty currentCity={currentCity} />
          )}
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  hotelsByCity: PropTypes.arrayOf(projectPropTypes.HOTEL.isRequired).isRequired,
  currentCity: PropTypes.string.isRequired,
  onCityClick: PropTypes.func.isRequired,
  onSortingTabClick: PropTypes.func.isRequired,
  currentSortType: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currentCity: state.currentCity,
  hotelsByCity: state.hotelsByCity,
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
