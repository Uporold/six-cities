import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main";
import { fakeAdTitles } from "../../mock";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should movie title button be pressed`, () => {
  const onAdTitleClick = jest.fn();

  const main = shallow(
    <Main adTitles={fakeAdTitles} onAdTitleClick={onAdTitleClick} />
  );

  const adTitleButtons = main.find(`.place-card__name`);

  adTitleButtons.forEach((movieTitleButton) => {
    movieTitleButton.props().onClick();
  });

  expect(onAdTitleClick.mock.calls.length).toBe(fakeAdTitles.length);
});
