import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { PlaceCardError } from "./place-card-error";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Should card be hovered`, () => {
  let onCloseHandler;
  let wrapper;

  beforeEach(() => {
    onCloseHandler = jest.fn();

    wrapper = shallow(
      <PlaceCardError
        errorMessage="Test error"
        hotelId={0}
        onClose={onCloseHandler}
      />
    );
  });

  it(`Card mouse enter and mouseout tests`, () => {
    wrapper.props().onClick();

    expect(onCloseHandler.mock.calls.length).toBe(1);
    expect(onCloseHandler.mock.calls[0][0]).toBe(0);
  });
});
