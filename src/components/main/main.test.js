import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";
import { fakeAdTitles } from "../../mock";

it(`Should Main render correctly`, () => {
  const tree = renderer.create(<Main adTitles={fakeAdTitles} />).toJSON();

  expect(tree).toMatchSnapshot();
});
