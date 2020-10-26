import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import App from "./components/app/app";
import reducer from "./redux/reducer";
import { createAPI } from "./api";
import { Operation as DataOperation } from "./redux/data/data";
import { Operation as UserOperation, ActionCreator } from "./redux/user/user";

const onUnauthorized = () => {
  store.dispatch(ActionCreator.setAuthorizationStatus(false));
};

const api = createAPI(onUnauthorized);

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);

store.dispatch(DataOperation.loadHotels());
store.dispatch(UserOperation.checkAuth());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
