import React from "react";
import renderer from "react-test-renderer";
import PlaceCard from "./place-card";
import { hotels } from "../../mock/offers";

it(`Should Place Card render correctly`, () => {
  const tree = renderer
    .create(
      <PlaceCard
        onPlaceCardClick={() => {}}
        hotel={hotels[0]}
        onHover={() => {}}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
