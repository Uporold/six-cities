import React from "react";
import renderer from "react-test-renderer";
import Property from "./property";
import { hotels } from "../../mock/offers";

it(`Should Property Page render correctly`, () => {
  const tree = renderer
    .create(
      <Property hotel={hotels[0]} hotels={hotels} onPlaceCardClick={() => {}} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
