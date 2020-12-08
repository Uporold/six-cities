import React from "react";
import PropTypes from "prop-types";
import FavoritesLocations from "../favorites-locations/favorites-locations";
import { projectPropTypes } from "../../utilites/project-prop-types";

const FavoritesLists = ({ cities, favoriteHotels }) => {
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {cities.map((city) => (
          <FavoritesLocations
            key={`favorite-list-block-${city}`}
            city={city}
            hotels={favoriteHotels.filter((item) => item.city.name === city)}
          />
        ))}
      </ul>
    </section>
  );
};

FavoritesLists.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  favoriteHotels: PropTypes.arrayOf(projectPropTypes.HOTEL.isRequired)
    .isRequired,
};

export default FavoritesLists;
