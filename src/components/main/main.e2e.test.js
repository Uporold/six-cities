import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main";
import { hotels } from "../../mock/offers";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should movie title button be pressed`, () => {
  const onAdTitleClick = jest.fn();
  const evt = { preventDefault: jest.fn };

  const main = mount(
    <Main hotels={hotels} onPlaceCardClick={onAdTitleClick} />
  );

  const adTitleButtons = main.find(`.cities__place-card`);

  adTitleButtons.forEach((movieTitleButton) => {
    movieTitleButton.props().onClick(evt);
  });

  expect(onAdTitleClick.mock.calls.length).toBe(hotels.length);
});
