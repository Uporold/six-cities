import React, { memo } from "react";
import PropTypes from "prop-types";
import FavoritesLocations from "../favorites-locations/favorites-locations";
import { projectPropTypes } from "../../utilites/project-prop-types";
import { Hotel } from "../../utilites/types";

interface Props {
  cities: Array<string>;
  favoriteHotels: Array<Hotel>;
}

const FavoritesLists: React.FC<Props> = memo(function FavoritesLists({
  cities,
  favoriteHotels,
}): JSX.Element {
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
});

export default FavoritesLists;
