import React from "react";
import renderer from "react-test-renderer";
import Map from "./map";
import { hotels } from "../../mock/offers";

it(`Should Map render correctly`, () => {
  const tree = renderer
    .create(<Map hotels={hotels} />, {
      createNodeMock: () => {
        return document.createElement(`div`);
      },
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
