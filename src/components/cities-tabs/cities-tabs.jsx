import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ActionCreator } from "../../redux/app/app";
import { getCurrentCity } from "../../redux/app/selectors";

const cities = [
  `Paris`,
  `Cologne`,
  `Brussels`,
  `Amsterdam`,
  `Hamburg`,
  `Dusseldorf`,
];
const CitiesTabs = ({ currentCity, onCityClick }) => {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li className="locations__item" key={city}>
              <a
                onClick={(evt) => {
                  evt.preventDefault();
                  if (currentCity !== city) {
                    onCityClick(city);
                  }
                }}
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
};

const mapDispatchToProps = (dispatch) => ({
  onCityClick(city) {
    dispatch(ActionCreator.setCity(city));
    dispatch(ActionCreator.setDefaultSortType());
  },
});

const mapStateToProps = (state) => ({
  currentCity: getCurrentCity(state),
});

export { CitiesTabs };
export default connect(mapStateToProps, mapDispatchToProps)(CitiesTabs);
