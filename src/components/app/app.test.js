import React from "react";
import renderer from "react-test-renderer";
import App from "./app";
import { hotels } from "../../mock/offers";

it(`Render App`, () => {
  const tree = renderer.create(<App hotels={hotels} />).toJSON();

  expect(tree).toMatchSnapshot();
});
