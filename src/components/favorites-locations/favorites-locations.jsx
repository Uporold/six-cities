import React from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card";
import { PageType } from "../../utilites/const";
import { projectPropTypes } from "../../utilites/project-prop-types";

const FavoritesLocations = ({ city, hotels }) => {
  return (
    <li key={city} className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {hotels.map((hotel) => (
          <PlaceCard hotel={hotel} pageType={PageType.FAVORITES} />
        ))}
      </div>
    </li>
  );
};

FavoritesLocations.propTypes = {
  hotels: PropTypes.arrayOf(projectPropTypes.HOTEL.isRequired).isRequired,
  city: PropTypes.string.isRequired,
};

export default FavoritesLocations;
