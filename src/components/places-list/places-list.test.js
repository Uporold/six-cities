import React from "react";
import renderer from "react-test-renderer";
import PlacesList from "./places-list";
import { hotels } from "../../mock/offers";

it(`Should Places List render correctly`, () => {
  const tree = renderer
    .create(<PlacesList hotels={hotels} onPlaceCardClick={() => {}} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
