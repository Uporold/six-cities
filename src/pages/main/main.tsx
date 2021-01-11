import React from "react";
import Header from "../../components/header/header";
import CitiesTabs from "../../components/cities-tabs/cities-tabs";
import MainEmpty from "../../components/main-empty/main-empty";
import PlacesContainer from "../../components/places-container/places-container";
import { useHotelsSortedByCity } from "../../redux/data/hooks/selectors";

const Main: React.FC = (): JSX.Element => {
  const hotels = useHotelsSortedByCity();
  return (
    <div
      className={`page page--gray page--main ${
        !hotels.length ? `page__main--index-empty` : ``
      }`}
    >
      <Header isMain />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesTabs />
        <div className="cities">
          {hotels.length > 0 ? <PlacesContainer /> : <MainEmpty />}
        </div>
      </main>
    </div>
  );
};

export default Main;
