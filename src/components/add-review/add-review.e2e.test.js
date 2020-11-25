import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";
import { AddReview } from "./add-review";

configure({ adapter: new Adapter() });

it(`Should local state change`, () => {
  const handleFormSubmit = jest.fn();
  const handleTextInputFocus = jest.fn();
  const wrapper = shallow(
    <AddReview
      hotelId={1}
      isReviewSending={false}
      isSendingError={false}
      onFormSubmit={handleFormSubmit}
      onTextInputFocus={handleTextInputFocus}
    />
  );
  wrapper
    .find(".reviews__rating-form")
    .simulate(`change`, { target: { value: 3 } });
  expect(wrapper.state().stars).toEqual(3);

  wrapper
    .find(".reviews__textarea")
    .simulate(`change`, { target: { value: `Test text` } });
  expect(wrapper.state().comment).toEqual(`Test text`);

  wrapper.find(`form.reviews__form`).simulate(`submit`, {
    preventDefault: jest.fn(),
    target: { reset: jest.fn() },
  });
  expect(handleFormSubmit).toHaveBeenCalledTimes(1);
  expect(wrapper.state().stars).toEqual(0);
  expect(wrapper.state().comment).toEqual(``);
});
