export const getHotelsByCity = (hotels, city) => {
  return hotels.filter((hotel) => hotel.city.name === city);
};

export const getHotelReviews = (hotel, reviews) => {
  const hotelReviews = reviews.find((review) => review.offerId === hotel.id);
  return hotelReviews ? hotelReviews.comments : [];
};
