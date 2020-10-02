import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import PlacesList from "./places-list";
import { hotels } from "../../mock/offers";

it(`Should Places List render correctly`, () => {
  const tree = renderer
    .create(
      <Router>
        <PlacesList hotels={hotels} onPlaceCardClick={() => {}} />
      </Router>,
      {
        createNodeMock: () => {
          return document.createElement(`div`);
        },
      }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
