import renderer from "react-test-renderer";
import React from "react";
import CitiesTabs from "./cities-tabs";

const DEFAULT_CITY = `Amsterdam`;

it(`Should Cities tabs render correctly`, () => {
  const tree = renderer
    .create(<CitiesTabs currentCity={DEFAULT_CITY} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
