import React from "react";
import Sorting from "../sorting/sorting";
import PlacesList from "../places-list/places-list";
import Map from "../map/map";
import { PageType } from "../../utilites/const";
import { useCurrentCity } from "../../redux/app/hooks/selectors";
import {
  useHotelsSortedByCity,
  useHotelsSortedByForm,
} from "../../redux/data/hooks/selectors";

const PlacesContainer = () => {
  const hotelsByCity = useHotelsSortedByCity();
  const sortedHotels = useHotelsSortedByForm();
  const currentCity = useCurrentCity();
  const center = [
    hotelsByCity[0].city.location.latitude,
    hotelsByCity[0].city.location.longitude,
  ];
  const zoom = [hotelsByCity[0].city.location.zoom];
  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {hotelsByCity.length} places to stay in {currentCity}
        </b>
        <Sorting currentCity={currentCity} />
        <PlacesList hotels={sortedHotels} pageType={PageType.MAIN} />
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map hotels={hotelsByCity} center={center} zoom={zoom} />
        </section>
      </div>
    </div>
  );
};

export default PlacesContainer;
