import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";
import { hotels } from "../../mock/offers";

it(`Should Main render correctly`, () => {
  const tree = renderer
    .create(<Main hotels={hotels} onPlaceCardClick={() => {}} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
