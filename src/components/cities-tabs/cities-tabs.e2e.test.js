import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { CitiesTabs } from "./cities-tabs";

configure({ adapter: new Adapter() });

const cities = [
  `Paris`,
  `Cologne`,
  `Brussels`,
  `Amsterdam`,
  `Hamburg`,
  `Dusseldorf`,
];

it(`Should CitiesTabs items clicked`, () => {
  const onCityClick = jest.fn();

  const citiesTabs = shallow(
    <CitiesTabs
      currentCity={cities[0]}
      clearErrorHotelIds={jest.fn()}
      errorHotelIds={[]}
      onCityClick={onCityClick}
    />
  );

  const targetCityButtonAmsterdam = citiesTabs
    .find(`a.locations__item-link`)
    .at(3);
  targetCityButtonAmsterdam.simulate(`click`, {
    preventDefault: jest.fn(),
  });

  const targetCityButtonHamburg = citiesTabs
    .find(`a.locations__item-link`)
    .at(4);
  targetCityButtonHamburg.simulate(`click`, {
    preventDefault: jest.fn(),
  });

  expect(onCityClick.mock.calls.length).toBe(2);
  expect(onCityClick.mock.calls[0][0]).toBe(`Amsterdam`);
  expect(onCityClick.mock.calls[1][0]).toBe(`Hamburg`);
});
