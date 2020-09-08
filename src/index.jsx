import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import { hotels } from "./mock/offers";

ReactDOM.render(<App hotels={hotels} />, document.getElementById("root"));
