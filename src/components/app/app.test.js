import React from "react";
import renderer from "react-test-renderer";
import App from "./app";
import { fakeAdTitles } from "../../mock";

it(`Render App`, () => {
  const tree = renderer.create(<App adTitles={fakeAdTitles} />).toJSON();

  expect(tree).toMatchSnapshot();
});
