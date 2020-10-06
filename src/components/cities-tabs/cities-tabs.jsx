import React from "react";
import PropTypes from "prop-types";

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
            <li className="locations__item">
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

export default CitiesTabs;
