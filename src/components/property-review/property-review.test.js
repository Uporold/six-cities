import React from "react";
import renderer from "react-test-renderer";
import PropertyReview from "./property-review";

const review = {
  id: 1,
  user: {
    id: 14,
    isPro: true,
    name: "Corey",
    avatar:
      "https://htmlacademy-react-3.appspot.com/six-cities/static/avatar/5.jpg",
  },
  rating: 4,
  comment:
    "Home is amazing. It's like staying in a museum. The rooms, furnishings and artworks are incredible. The views of My Vesuvius",
  date: "2020-07-29T07:00:10.725Z",
};

it(`Should Reviews List render correctly`, () => {
  const tree = renderer.create(<PropertyReview review={review} />).toJSON();

  expect(tree).toMatchSnapshot();
});
