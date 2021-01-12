import React, { memo } from "react";
import { cities } from "../../utilites/const";
import { useCurrentCity } from "../../redux/app/hooks/selectors";
import { useSetCity } from "../../redux/app/hooks/useSetCity";
import { useClearErrorIds } from "../../redux/data/hooks/useClearErrorIds";
import { useErrorHotelIds } from "../../redux/data/hooks/selectors";
import { useSetDefaultSortType } from "../../redux/app/hooks/useSetDefaultSortType";

const CitiesTabs: React.FC = memo(function CitiesTabs(): JSX.Element {
  const currentCity = useCurrentCity();
  const clearErrorHotelIds = useClearErrorIds();
  const errorHotelIds = useErrorHotelIds();
  const setCity = useSetCity();
  const setDefaultSortType = useSetDefaultSortType();

  const onCityTabClickHandler = (city: string) => (evt: React.MouseEvent) => {
    evt.preventDefault();
    if (currentCity !== city) {
      setCity(city);
      setDefaultSortType();
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
});

export default CitiesTabs;
