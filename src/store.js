import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { ActionCreator, Operation as UserOperation } from "./redux/user/user";
import { createAPI } from "./api";
import reducer from "./redux/reducer";
import { Operation as DataOperation } from "./redux/data/data";
import history from "./history";

const Error = {
  UNAUTHORIZED: 401,
};

const onUnauthorized = (err) => {
  if (err.response && err.response.status === Error.UNAUTHORIZED) {
    store.dispatch(ActionCreator.setAuthorizationStatus(false));
    if (err.response.config.method === `post`) {
      history.push(`/login`);
    }
  }
};

const api = createAPI(onUnauthorized);

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);

store.dispatch(DataOperation.loadHotels());
store.dispatch(UserOperation.checkAuth());

export { store as default };