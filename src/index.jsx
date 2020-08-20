import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import { fakeAdTitles } from "./mock";

ReactDOM.render(
  <App adTitles={fakeAdTitles} />,
  document.getElementById("root")
);
