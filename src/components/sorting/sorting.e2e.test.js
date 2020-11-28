import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Sorting } from "./sorting";

configure({ adapter: new Adapter() });

describe(`Should Sorting state change`, () => {
  let onSortingTabClick;
  let sorting;
  beforeEach(() => {
    onSortingTabClick = jest.fn();
    sorting = shallow(
      <Sorting
        currentCity="Paris"
        currentSortType="Popular"
        onSortingTabClick={onSortingTabClick}
      />
    );
  });

  it(`Should Sorting state change`, () => {
    sorting.find(".places__sorting-type").simulate(`click`);
    expect(sorting.state().isSortOpen).toEqual(true);
    sorting.find(".places__sorting-type").simulate(`click`);
    expect(sorting.state().isSortOpen).toEqual(false);
  });

  it(`Should Sorting sortType change`, () => {
    const evt = {
      preventDefault: jest.fn(),
    };
    const targetSortLowHigh = sorting.find(`li.places__option`).at(1);
    targetSortLowHigh.simulate(`click`, evt);

    const targetSortHighLow = sorting.find(`li.places__option`).at(2);
    targetSortHighLow.simulate(`click`, evt);

    expect(onSortingTabClick.mock.calls.length).toBe(2);
    expect(onSortingTabClick.mock.calls[0][0]).toBe(`Price: low to high`);
    expect(onSortingTabClick.mock.calls[1][0]).toBe(`Price: high to low`);
  });
});
