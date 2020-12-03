import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ActionCreator } from "../../redux/app/app";
import { getCurrentCity } from "../../redux/app/selectors";
import { ActionCreator as ActionCreatorData } from "../../redux/data/data";
import { getErrorHotelIds } from "../../redux/data/selectors";

const cities = [
  `Paris`,
  `Cologne`,
  `Brussels`,
  `Amsterdam`,
  `Hamburg`,
  `Dusseldorf`,
];
const CitiesTabs = ({
  currentCity,
  onCityClick,
  errorHotelIds,
  clearErrorHotelIds,
}) => {
  const onCityTabClickHandler = (city) => (evt) => {
    evt.preventDefault();
    if (currentCity !== city) {
      onCityClick(city);
    }
    if (errorHotelIds.length > 0) {
      clearErrorHotelIds();
    }
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li className="locations__item" key={city}>
              <a
                onClick={onCityTabClickHandler(city)}
                className={`locations__item-link tabs__item ${
                  city === currentCity ? `tabs__item--active` : ``
                }`}
                href="#"
              >
                <span>{city}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

CitiesTabs.propTypes = {
  currentCity: PropTypes.string.isRequired,
  onCityClick: PropTypes.func.isRequired,
  errorHotelIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  clearErrorHotelIds: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onCityClick(city) {
    dispatch(ActionCreator.setCity(city));
    dispatch(ActionCreator.setDefaultSortType());
  },
  clearErrorHotelIds() {
    dispatch(ActionCreatorData.clearErrorHotelIds());
  },
});

const mapStateToProps = (state) => ({
  currentCity: getCurrentCity(state),
  errorHotelIds: getErrorHotelIds(state),
});

export { CitiesTabs };
export default connect(mapStateToProps, mapDispatchToProps)(CitiesTabs);
