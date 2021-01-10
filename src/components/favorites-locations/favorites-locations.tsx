import React, { memo } from "react";
import PlaceCard from "../place-card/place-card";
import { PageType } from "../../utilites/const";
import { Hotel, Page } from "../../utilites/types";

interface Props {
  city: string;
  hotels: Array<Hotel>;
}

const FavoritesLocations: React.FC<Props> = memo(function FavoritesLocations({
  city,
  hotels,
}): JSX.Element {
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
          <PlaceCard
            key={`${PageType.FAVORITES} ${hotel.id} item`}
            hotel={hotel}
            pageType={PageType.FAVORITES as Page}
          />
        ))}
      </div>
    </li>
  );
});

export default FavoritesLocations;
