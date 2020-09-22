import React from "react";
import renderer from "react-test-renderer";
import Map from "./map";
import { hotels } from "../../mock/offers";

it(`Should Main render correctly`, () => {
  const tree = renderer
    .create(<Map hotels={hotels} onPlaceCardClick={() => {}} />, {
      createNodeMock: () => {
        return document.createElement(`div`);
      },
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
