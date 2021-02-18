import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { AxiosError, AxiosInstance } from "axios";
import { ActionCreator } from "./redux/user/user";
import { createAPI } from "./api";
import { AllReduxActions, GlobalState, rootReducer } from "./redux/reducer";

const Error = {
  UNAUTHORIZED: 401,
};

const onUnauthorized = (err: AxiosError) => {
  if (err.response && err.response.status === Error.UNAUTHORIZED) {
    store.dispatch(ActionCreator.setAuthorizationStatus(false));
  }
};

const api = createAPI(onUnauthorized);

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk.withExtraArgument(api) as ThunkMiddleware<
        GlobalState,
        AllReduxActions,
        AxiosInstance
      >,
    ),
  ),
);

export default store;
