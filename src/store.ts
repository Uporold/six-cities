import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { AxiosError } from "axios";
import { ActionCreator, Operation as UserOperation } from "./redux/user/user";
import { createAPI } from "./api";
import reducer from "./redux/reducer";
import { Operation as DataOperation } from "./redux/data/data";

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
  reducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))),
);

store.dispatch(DataOperation.loadHotels());
store.dispatch(UserOperation.checkAuth());

export { store as default };
