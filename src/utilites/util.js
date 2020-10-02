export const getHotelsByCity = (hotels, city) => {
  return hotels.filter((hotel) => hotel.city.name === city);
};

export const getHotelReviews = (hotel, reviews) => {
  const hotelReviews = reviews.find((review) => review.offerId === hotel.id);
  return hotelReviews ? hotelReviews.comments : [];
};

export const sortTypes = {
  SORT_POPULAR: `Popular`,
  SORT_PRICE_LOW_TO_HIGH: `Price: low to high`,
  SORT_PRICE_HIGH_TO_LOW: `Price: high to low`,
  SORT_TOP_RATED: `Top rated first`,
};

export const getSortedHotels = (hotels, sortType) => {
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
