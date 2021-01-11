import React, { memo } from "react";
import PlaceCard from "../place-card/place-card";
import { PageType } from "../../utilites/const";
import { Hotel, Page } from "../../utilites/types";

const pageTypeToListClass = {
  [PageType.MAIN]: `cities__places-list`,
  [PageType.PROPERTY]: `near-places__list`,
};

interface Props {
  hotels: Array<Hotel>;
  pageType: Page;
}

const PlacesList: React.FC<Props> = memo(function PlacesList({
  hotels,
  pageType,
}): JSX.Element {
  return (
    <div className={`${pageTypeToListClass[pageType]} places__list`}>
      {hotels.map((hotel) => (
        <PlaceCard key={hotel.id} hotel={hotel} pageType={pageType} />
      ))}
    </div>
  );
});

export default PlacesList;
