import React from "react";
import renderer from "react-test-renderer";
import { Router } from "react-router-dom";
import Footer from "./footer";
import history from "../../history";

it(`Footer component renders correctly`, () => {
  const tree = renderer
    .create(
      <Router history={history}>
        <Footer />
      </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
