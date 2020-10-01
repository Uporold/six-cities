import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./components/app/app";
import { reducer } from "./redux/reducer";
import { hotels } from "./mock/offers";

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App hotels={hotels} />
  </Provider>,
  document.getElementById("root")
);
