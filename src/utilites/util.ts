import { useEffect, useRef } from "react";
import { months } from "./const";
import { Hotel, Sort } from "./types";

export const getHotelsByCity = (
  hotels: Array<Hotel>,
  city: string,
): Array<Hotel> => {
  return hotels.filter((hotel) => hotel.city.name === city);
};

// export const getHotelReviews = (hotel, reviews) => {
//   const hotelReviews = reviews.find((review) => review.offerId === hotel.id);
//   return hotelReviews ? hotelReviews.comments : [];
// };

export const sortTypes = {
  SORT_POPULAR: `Popular`,
  SORT_PRICE_LOW_TO_HIGH: `Price: low to high`,
  SORT_PRICE_HIGH_TO_LOW: `Price: high to low`,
  SORT_TOP_RATED: `Top rated first`,
};

export const getSortedHotels = (
  hotels: Array<Hotel>,
  sortType: Sort,
): Array<Hotel> => {
  switch (sortType) {
    case sortTypes.SORT_PRICE_LOW_TO_HIGH:
      return hotels.slice().sort((a, b) => a.price - b.price);
    case sortTypes.SORT_PRICE_HIGH_TO_LOW:
      return hotels.slice().sort((a, b) => b.price - a.price);
    case sortTypes.SORT_TOP_RATED:
      return hotels.slice().sort((a, b) => b.rating - a.rating);
    default:
      return hotels;
  }
};

export const getHotelsCities = (hotels: Array<Hotel>): Array<string> => {
  return [
    ...new Set(
      hotels
        .map((hotel) => hotel.city.name)
        .sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        }),
    ),
  ];
};

export const getDate = (date: string): string => {
  return `${months[new Date(date).getMonth()]} ${new Date(date).getFullYear()}`;
};

export const usePrevious = <T>(value: T): T => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current as T;
};
