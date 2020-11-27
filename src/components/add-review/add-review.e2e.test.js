import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";
import { AddReview } from "./add-review";

configure({ adapter: new Adapter() });

describe(`AddReview tests`, () => {
  let handleFormSubmit;
  let handleTextInputFocus;
  let wrapper;
  beforeEach(() => {
    handleFormSubmit = jest.fn();
    handleTextInputFocus = jest.fn();
    wrapper = shallow(
      <AddReview
        hotelId={1}
        isReviewSending={false}
        isSendingError={false}
        onFormSubmit={handleFormSubmit}
        onTextInputFocus={handleTextInputFocus}
      />
    );
  });

  it(`Should rating state change`, () => {
    wrapper
      .find(".reviews__rating-form")
      .simulate(`change`, { target: { value: 3 } });
    expect(wrapper.state().stars).toEqual(3);
  });

  it(`Should comment state change`, () => {
    wrapper
      .find(".reviews__textarea")
      .simulate(`change`, { target: { value: `Test text` } });
    expect(wrapper.state().comment).toEqual(`Test text`);
  });

  it(`Should textarea focus call function`, () => {
    wrapper.find(".reviews__textarea").simulate(`focus`);
    expect(handleTextInputFocus).toHaveBeenCalledTimes(1);
  });

  it(`Should reset state after submit button click`, () => {
    wrapper.setState({ comment: `Test comment`, stars: 5 });
    wrapper.find(`form.reviews__form`).simulate(`submit`, {
      preventDefault: jest.fn(),
      target: { reset: jest.fn() },
    });
    expect(handleFormSubmit).toHaveBeenCalledTimes(1);
    expect(wrapper.state().stars).toEqual(0);
    expect(wrapper.state().comment).toEqual(``);
  });
});
