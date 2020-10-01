import renderer from "react-test-renderer";
import React from "react";
import Header from "./header";

it(`Should Header render correctly`, () => {
  const tree = renderer.create(<Header />).toJSON();

  expect(tree).toMatchSnapshot();
});
