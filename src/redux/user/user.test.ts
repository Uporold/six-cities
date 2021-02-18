import MockAdapter from "axios-mock-adapter";
import { reducer, ActionCreator, ActionType, Operation } from "./user";
import { createAPI } from "../../api";

const pureUserData = {
  id: 1,
  email: `test@gmail.com`,
  name: `test`,
  [`is_pro`]: false,
  [`avatar_url`]: "/img/test",
};

const userData = {
  id: 1,
  email: `test@gmail.com`,
  name: `test`,
  isPro: false,
  avatar: "https://4.react.pages.academy/img/test",
};

const userUnregistered = {
    id: -1,
    email: ``,
    isPro: false,
    avatar: ``,
    name: ``,
  };

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    authorizationStatus: false,
    isAuthorizationLoading: true,
    user: userUnregistered,
  });
});

it(`Reducer should change authorizationStatus by a given value`, () => {
  expect(
    reducer(
      {
        authorizationStatus: false,
      },
      {
        type: ActionType.SET_AUTHORIZATION_STATUS,
        payload: true,
      },
    ),
  ).toEqual({
    authorizationStatus: true,
  });

  expect(
    reducer(
      {
        authorizationStatus: true,
      },
      {
        type: ActionType.SET_AUTHORIZATION_STATUS,
        payload: false,
      },
    ),
  ).toEqual({
    authorizationStatus: false,
  });

  expect(
    reducer(
      {
        authorizationStatus: true,
      },
      {
        type: ActionType.SET_AUTHORIZATION_STATUS,
        payload: true,
      },
    ),
  ).toEqual({
    authorizationStatus: true,
  });

  expect(
    reducer(
      {
        authorizationStatus: false,
      },
      {
        type: ActionType.SET_AUTHORIZATION_STATUS,
        payload: false,
      },
    ),
  ).toEqual({
    authorizationStatus: false,
  });
});

it(`Reducer should change isAuthorizationLoading after receiving data from server`, () => {
  expect(
    reducer(
      {
        isAuthorizationLoading: true,
      },
      {
        type: ActionType.FINISH_AUTHORIZATION,
        payload: false,
      },
    ),
  ).toEqual({
    isAuthorizationLoading: false,
  });
});

it(`Reducer should get user data`, () => {
  expect(
    reducer(
      {
        user: {
          id: -1,
          email: ``,
          isPro: false,
          avatar: ``,
          name: ``,
        },
      },
      {
        type: ActionType.GET_USER_DATA,
        payload: userData,
      },
    ),
  ).toEqual({
    user: userData,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for set authorization returns correct action`, () => {
    expect(ActionCreator.setAuthorizationStatus(false)).toEqual({
      type: ActionType.SET_AUTHORIZATION_STATUS,
      payload: false,
    });

    expect(ActionCreator.setAuthorizationStatus(true)).toEqual({
      type: ActionType.SET_AUTHORIZATION_STATUS,
      payload: true,
    });
  });

  it(`Action creator for finish authorization loading returns correct action`, () => {
    expect(ActionCreator.finishAuthorizationLoading()).toEqual({
      type: ActionType.FINISH_AUTHORIZATION,
      payload: false,
    });
  });

  it(`Action creator for get user data returns correct action`, () => {
    expect(ActionCreator.getUserData(userData)).toEqual({
      type: ActionType.GET_USER_DATA,
      payload: userData,
    });
  });
});

describe(`Operations work correctly`, () => {
  it(`Operation should check authorization`, () => {
    const api = createAPI(() => {});

    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthorization = Operation.checkAuth();

    apiMock.onGet(`/login`).reply(200, pureUserData);

    return checkAuthorization(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.SET_AUTHORIZATION_STATUS,
        payload: true,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.GET_USER_DATA,
        payload: userData,
      });
      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.FINISH_AUTHORIZATION,
        payload: false,
      });
    });
  });

  it(`Operation should check POST to login`, () => {
    const api = createAPI(() => {});

    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUser = { email: `test@test.ru`, password: `123456` };
    const auth = Operation.login(fakeUser);

    apiMock.onPost(`/login`).reply(200, pureUserData);

    return auth(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.SET_AUTHORIZATION_STATUS,
        payload: true,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.GET_USER_DATA,
        payload: userData,
      });
    });
  });
});
