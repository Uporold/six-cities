import React from "react";
import renderer from "react-test-renderer";
import { MainEmpty } from "./main-empty";

const city = `Paris`;

it(`Favorites locations`, () => {
  const tree = renderer.create(<MainEmpty currentCity={city} />).toJSON();

  expect(tree).toMatchSnapshot();
});
