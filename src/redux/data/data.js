import { hotelAdapter, reviewAdapter } from "../adapter/adapter";

export const initialState = {
  hotels: [
    {
      city: {
        name: "Dusseldorf",
        location: { latitude: 51.225402, longitude: 6.776314, zoom: 13 },
      },
      preview_image:
        "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/6.jpg",
      images: [
        "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/13.jpg",
        "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/1.jpg",
        "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/20.jpg",
        "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/7.jpg",
        "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/14.jpg",
        "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg",
        "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/12.jpg",
        "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/18.jpg",
        "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg",
        "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/10.jpg",
        "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/11.jpg",
        "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/5.jpg",
        "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/8.jpg",
        "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/2.jpg",
      ],
      title: "The Pondhouse - A Magical Place",
      is_favorite: false,
      is_premium: false,
      rating: 4.1,
      type: "house",
      bedrooms: 2,
      max_adults: 4,
      price: 736,
      goods: [
        "Air conditioning",
        "Laptop friendly workspace",
        "Breakfast",
        "Washer",
      ],
      host: {
        id: 25,
        name: "Angelina",
        is_pro: true,
        avatar_url: "img/avatar-angelina.jpg",
      },
      description:
        "Relax, rejuvenate and unplug in this ultimate rustic getaway experience in the country. In our beautiful screened Pondhouse, you can gaze at the stars and listen to the sounds of nature from your cozy warm bed.",
      location: { latitude: 51.225402, longitude: 6.784314, zoom: 16 },
      id: 1,
    },
  ],
  hotelReviews: [],
  nearbyHotels: [],
};

export const ActionType = {
  LOAD_HOTELS: `LOAD_HOTELS`,
  LOAD_HOTEL_REVIEWS: `LOAD_HOTEL_REVIEWS`,
  LOAD_NEARBY_HOTELS: `LOAD_NEARBY_HOTELS`,
};

export const ActionCreator = {
  loadHotels: (data) => {
    return {
      type: ActionType.LOAD_HOTELS,
      payload: data,
    };
  },

  loadHotelReviews: (data) => {
    return {
      type: ActionType.LOAD_HOTEL_REVIEWS,
      payload: data,
    };
  },

  loadNearbyHotels: (data) => {
    return {
      type: ActionType.LOAD_NEARBY_HOTELS,
      payload: data,
    };
  },
};

export const Operation = {
  loadHotels: () => (dispatch, getState, api) => {
    return api.get(`/hotels`).then((response) => {
      const loadedHotels = response.data.map((hotel) => hotelAdapter(hotel));
      dispatch(ActionCreator.loadHotels(loadedHotels));
    });
  },

  loadHotelReviews: (hotelId) => (dispatch, getState, api) => {
    return api.get(`/comments/${hotelId}`).then((response) => {
      const loadedComments = response.data.map((comment) =>
        reviewAdapter(comment)
      );
      dispatch(ActionCreator.loadHotelReviews(loadedComments));
    });
  },

  loadNearbyHotels: (hotelId) => (dispatch, getState, api) => {
    return api.get(`/hotels/${hotelId}/nearby`).then((response) => {
      const loadedNearbyHotels = response.data.map((nearbyHotel) =>
        hotelAdapter(nearbyHotel)
      );
      dispatch(ActionCreator.loadNearbyHotels(loadedNearbyHotels));
    });
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_HOTELS:
      return { ...state, hotels: action.payload };
    case ActionType.LOAD_HOTEL_REVIEWS:
      return { ...state, hotelReviews: action.payload };
    case ActionType.LOAD_NEARBY_HOTELS:
      return { ...state, nearbyHotels: action.payload };
    default:
      return state;
  }
};
