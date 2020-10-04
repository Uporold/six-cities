import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import PlaceCard from "./place-card";
import { hotels } from "../../mock/offers";

it(`Should Place Card render correctly`, () => {
  const tree = renderer
    .create(
      <Router>
        <PlaceCard
          hotel={hotels[0]}
          onHover={() => {}}
          onHotelCardOut={() => {}}
        />
      </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
