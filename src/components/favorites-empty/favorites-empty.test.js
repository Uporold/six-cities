import React from "react";
import renderer from "react-test-renderer";
import FavoritesEmpty from "./favorites-empty";

it(`FavoritesEmpty component renders correctly`, () => {
  const tree = renderer.create(<FavoritesEmpty />).toJSON();

  expect(tree).toMatchSnapshot();
});
