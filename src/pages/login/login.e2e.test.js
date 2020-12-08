import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Login } from "./login";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Login tests`, () => {
  let handleOnSubmit;
  let handleClearErrorHotelIds;
  let wrapper;

  beforeEach(() => {
    handleOnSubmit = jest.fn();
    handleClearErrorHotelIds = jest.fn();

    wrapper = shallow(
      <Login
        onSubmit={handleOnSubmit}
        clearErrorHotelIds={handleClearErrorHotelIds}
        currentCity="Paris"
        errorHotelIds={[1, 2, 3]}
      />
    );
  });
  it(`Login submit form test`, () => {
    const evt = {
      preventDefault: jest.fn(),
    };
    const instance = wrapper.instance();
    instance.emailRef = {
      current: {
        value: "test@test.ru",
      },
    };
    instance.passwordRef = {
      current: {
        value: "test",
      },
    };

    const loginForm = wrapper.find(`form.login__form`);
    loginForm.simulate(`submit`, evt);
    expect(handleOnSubmit).toHaveBeenCalledTimes(1);
    expect(handleOnSubmit).toHaveBeenCalledWith({
      email: "test@test.ru",
      password: "test",
    });
  });

  it(`Login component unmount test with error hotels ids`, () => {
    wrapper.unmount();
    expect(handleClearErrorHotelIds).toHaveBeenCalledTimes(1);
  });

  it(`Login component unmount test without error hotels ids`, () => {
    wrapper.setProps({ errorHotelIds: [] });
    wrapper.unmount();
    expect(handleClearErrorHotelIds).toHaveBeenCalledTimes(0);
  });
});
