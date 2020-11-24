import MockAdapter from "axios-mock-adapter";
import { reducer, ActionCreator, ActionType, Operation } from "./data";
import { hotels } from "../../mock/offers";
import { reviews } from "../../mock/reviews";
import { createAPI } from "../../api";

const pureHotels = [
  {
    city: {
      name: "Brussels",
      location: { latitude: 50.846557, longitude: 4.351697, zoom: 13 },
    },
    [`preview_image`]: "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg",
    images: [
      "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/2.jpg",
      "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/5.jpg",
      "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg",
      "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/13.jpg",
      "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/16.jpg",
      "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/9.jpg",
      "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/17.jpg",
      "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/6.jpg",
      "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg",
      "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/14.jpg",
      "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/20.jpg",
      "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/8.jpg",
      "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/7.jpg",
      "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/4.jpg",
    ],
    title: "Nice, cozy, warm big bed apartment",
    [`is_favorite`]: false,
    [`is_premium`]: false,
    rating: 4.9,
    type: "apartment",
    bedrooms: 3,
    [`max_adults`]: 6,
    price: 488,
    goods: [
      "Breakfast",
      "Baby seat",
      "Washer",
      "Towels",
      "Fridge",
      "Air conditioning",
      "Laptop friendly workspace",
    ],
    host: {
      id: 25,
      name: "Angelina",
      [`is_pro`]: true,
      [`avatar_url`]: "img/avatar-angelina.jpg",
    },
    description:
      "Peaceful studio in the most wanted area in town. Quiet house Near of everything. Completely renovated. Lovely neighbourhood, lot of trendy shops, restaurants and bars in a walking distance.",
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 16,
    },
    id: 1,
  },
];

const pureReviews = [
  {
    id: 1,
    user: {
      id: 14,
      [`is_pro`]: true,
      name: "Corey",
      [`avatar_url`]: "https://htmlacademy-react-3.appspot.com/six-cities/static/avatar/5.jpg",
    },
    rating: 4,
    comment:
      "Home is amazing. It's like staying in a museum. The rooms, furnishings and artworks are incredible. The views of My Vesuvius",
    date: "2020-07-29T07:00:10.725Z",
  },
  {
    id: 2,
    user: {
      id: 12,
      [`is_pro`]: true,
      name: "Isaac",
      [`avatar_url`]: "https://htmlacademy-react-3.appspot.com/six-cities/static/avatar/3.jpg",
    },
    rating: 4,
    comment:
      "The room was spacious and clean. The pool looked nothing like the photos and desparately needs a clean. The sauna and spa were closed for lunar new year holiday.",
    date: "2020-07-29T07:00:10.725Z",
  },
];

const api = createAPI(() => {});

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    hotels: [],
    favoriteHotels: [],
    hotelReviews: [],
    nearbyHotels: [],
    isDataLoading: true,
    isFavoritesLoading: true,
    isSendingError: false,
    isReviewSending: false,
    errorMessage: ``,
    errorHotelIds: [],
  });
});

it(`Reducer should update hotels by load hotels`, () => {
  expect(
    reducer(
      {
        hotels: [],
      },
      {
        type: ActionType.LOAD_HOTELS,
        payload: hotels,
      }
    )
  ).toEqual({
    hotels,
  });
});

it(`Reducer should update favorite hotels by load favorite hotels`, () => {
  expect(
    reducer(
      {
        favoriteHotels: [],
      },
      {
        type: ActionType.LOAD_FAVORITE_HOTELS,
        payload: hotels,
      }
    )
  ).toEqual({
    favoriteHotels: hotels,
  });
});

it(`Reducer should update hotel reviews by load hotel reviews`, () => {
  expect(
    reducer(
      {
        hotelReviews: [],
      },
      {
        type: ActionType.LOAD_HOTEL_REVIEWS,
        payload: reviews,
      }
    )
  ).toEqual({
    hotelReviews: reviews,
  });
});

it(`Reducer should update nearby hotels by load nearby hotels`, () => {
  expect(
    reducer(
      {
        nearbyHotels: [],
      },
      {
        type: ActionType.LOAD_NEARBY_HOTELS,
        payload: hotels,
      }
    )
  ).toEqual({
    nearbyHotels: hotels,
  });
});

it(`Reducer should finish hotels loading correctly`, () => {
  expect(
    reducer(
      {
        isDataLoading: true,
      },
      {
        type: ActionType.FINISH_LOADING,
        payload: false,
      }
    )
  ).toEqual({
    isDataLoading: false,
  });
});

it(`Reducer should finish favorite hotels loading correctly`, () => {
  expect(
    reducer(
      {
        isFavoritesLoading: true,
      },
      {
        type: ActionType.FINISH_FAVORITES_LOADING,
        payload: false,
      }
    )
  ).toEqual({
    isFavoritesLoading: false,
  });
});

it(`Reducer should update favorite hotels`, () => {
  expect(
    reducer(
      {
        hotels,
        nearbyHotels: [],
        favoriteHotels: [],
      },
      {
        type: ActionType.UPDATE_FAVORITE_STATUS,
        payload: hotels[0],
      }
    )
  ).toEqual({
    hotels,
    nearbyHotels: [],
    favoriteHotels: [].filter((item) => item.id !== hotels[0].id),
  });
});

it(`Reducer should send error status correctly`, () => {
  expect(
    reducer(
      {
        isSendingError: false,
      },
      {
        type: ActionType.SET_SENDING_ERROR_STATUS,
        payload: true,
      }
    )
  ).toEqual({
    isSendingError: true,
  });
});

it(`Reducer should send review sending status correctly`, () => {
  expect(
    reducer(
      {
        isReviewSending: false,
      },
      {
        type: ActionType.SET_REVIEW_SENDING_STATUS,
        payload: true,
      }
    )
  ).toEqual({
    isReviewSending: true,
  });
});

it(`Reducer should load error message`, () => {
  expect(
    reducer(
      {
        errorMessage: ``,
      },
      {
        type: ActionType.SET_ERROR_MESSAGE,
        payload: `Testing error message`,
      }
    )
  ).toEqual({
    errorMessage: `Testing error message`,
  });
});

it(`Reducer should set error hotel id`, () => {
  expect(
    reducer(
      {
        errorHotelIds: [],
      },
      {
        type: ActionType.SET_ERROR_HOTEL_ID,
        payload: 1,
      }
    )
  ).toEqual({
    errorHotelIds: [].concat(1),
  });
});

it(`Reducer should remove error hotel id`, () => {
  expect(
    reducer(
      {
        errorHotelIds: [1, 2, 3],
      },
      {
        type: ActionType.REMOVE_FROM_ERROR_HOTEL_ID,
        payload: 1,
      }
    )
  ).toEqual({
    errorHotelIds: [1, 2, 3].filter((item) => item !== 1),
  });
});

it(`Reducer should clear error hotel ids`, () => {
  expect(
    reducer(
      {
        errorHotelIds: [1, 2, 3],
      },
      {
        type: ActionType.CLEAR_ERROR_HOTEL_IDS,
        payload: [],
      }
    )
  ).toEqual({
    errorHotelIds: [],
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for load hotels returns correct action`, () => {
    expect(ActionCreator.loadHotels(hotels)).toEqual({
      type: ActionType.LOAD_HOTELS,
      payload: hotels,
    });
  });

  it(`Action creator for load favorite hotels returns correct action`, () => {
    expect(ActionCreator.loadFavoriteHotels(hotels)).toEqual({
      type: ActionType.LOAD_FAVORITE_HOTELS,
      payload: hotels,
    });
  });

  it(`Action creator for load hotel reviews returns correct action`, () => {
    expect(ActionCreator.loadHotelReviews(reviews)).toEqual({
      type: ActionType.LOAD_HOTEL_REVIEWS,
      payload: reviews,
    });
  });

  it(`Action creator for load nearby hotels returns correct action`, () => {
    expect(ActionCreator.loadNearbyHotels(hotels)).toEqual({
      type: ActionType.LOAD_NEARBY_HOTELS,
      payload: hotels,
    });
  });

  it(`Action creator for finish loading returns correct action`, () => {
    expect(ActionCreator.finishLoading()).toEqual({
      type: ActionType.FINISH_LOADING,
      payload: false,
    });
  });

  it(`Action creator for finish favorites loading returns correct action`, () => {
    expect(ActionCreator.finishFavoritesLoading()).toEqual({
      type: ActionType.FINISH_FAVORITES_LOADING,
      payload: false,
    });
  });

  it(`Action creator for update favorite status returns correct action`, () => {
    expect(ActionCreator.updateFavoriteStatus(hotels[0])).toEqual({
      type: ActionType.UPDATE_FAVORITE_STATUS,
      payload: hotels[0],
    });
  });

  it(`Action creator for set sending status returns correct action`, () => {
    expect(ActionCreator.setSendingErrorStatus(`Test error`)).toEqual({
      type: ActionType.SET_SENDING_ERROR_STATUS,
      payload: `Test error`,
    });
  });

  it(`Action creator for set review sending status returns correct action`, () => {
    expect(ActionCreator.setReviewSendingStatus(`Test error`)).toEqual({
      type: ActionType.SET_REVIEW_SENDING_STATUS,
      payload: `Test error`,
    });
  });

  it(`Action creator for set error message returns correct action`, () => {
    expect(ActionCreator.setErrorMessage(`Test error`)).toEqual({
      type: ActionType.SET_ERROR_MESSAGE,
      payload: `Test error`,
    });
  });

  it(`Action creator for set error hotel id returns correct action`, () => {
    expect(ActionCreator.setErrorHotelId(1)).toEqual({
      type: ActionType.SET_ERROR_HOTEL_ID,
      payload: 1,
    });
  });

  it(`Action creator for remove error hotel id returns correct action`, () => {
    expect(ActionCreator.removeErrorHotelId(1)).toEqual({
      type: ActionType.REMOVE_FROM_ERROR_HOTEL_ID,
      payload: 1,
    });
  });

  it(`Action creator for clear error hotel ids returns correct action`, () => {
    expect(ActionCreator.clearErrorHotelIds()).toEqual({
      type: ActionType.CLEAR_ERROR_HOTEL_IDS,
      payload: [],
    });
  });
});

describe(`Operations work correctly`, () => {
  it(`Should make a correct API call to /hotels`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const hotelsLoader = Operation.loadHotels();

    apiMock.onGet(`/hotels`).reply(200, pureHotels);
    return hotelsLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_HOTELS,
        payload: [hotels[0]],
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.FINISH_LOADING,
        payload: false,
      });
    });
  });

  it(`Should make a correct API call to /favorite`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoriteHotelsLoader = Operation.loadFavoriteHotels();

    apiMock.onGet(`/favorite`).reply(200, pureHotels);
    return favoriteHotelsLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_FAVORITE_HOTELS,
        payload: [hotels[0]],
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.FINISH_FAVORITES_LOADING,
        payload: false,
      });
    });
  });

  it(`Should make a correct API call to /comments/0`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const hotelReviews = Operation.loadHotelReviews(0);

    apiMock.onGet(`/comments/0`).reply(200, pureReviews);
    return hotelReviews(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_HOTEL_REVIEWS,
        payload: reviews,
      });
    });
  });

  it(`Should make a correct API call to /hotels/0/nearby`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const nearbyHotels = Operation.loadNearbyHotels(0);

    apiMock.onGet(`/hotels/0/nearby`).reply(200, pureHotels);
    return nearbyHotels(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_NEARBY_HOTELS,
        payload: [hotels[0]],
      });
    });
  });

  it(`Operation should check POST to /comments/0`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeReview = { comment: `Test comment`, email: `test@test.ru` };
    const sendReview = Operation.sendReview(0, fakeReview);

    apiMock.onPost(`/comments/0`).reply(200, [{ fake: true }]);

    return sendReview(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(4);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.SET_REVIEW_SENDING_STATUS,
        payload: true,
      });

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.SET_SENDING_ERROR_STATUS,
        payload: false,
      });

      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.SET_REVIEW_SENDING_STATUS,
        payload: false,
      });

      expect(dispatch).toHaveBeenNthCalledWith(4, expect.any(Function));
    });
  });

  it(`Operation should check POST to /favorite/0/1`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const changeFavorite = Operation.changeHotelFavoriteStatus(0, true);

    apiMock.onPost(`/favorite/0/1`).reply(200, pureHotels[0]);

    return changeFavorite(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.UPDATE_FAVORITE_STATUS,
        payload: hotels[0],
      });
    });
  });
});
