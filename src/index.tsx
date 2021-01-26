import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/app/app";
import store from "./store";
import { Operation as DataOperation } from "./redux/data/data";
import { Operation as UserOperation } from "./redux/user/user";

store.dispatch(DataOperation.loadHotels());
store.dispatch(UserOperation.checkAuth());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
);
