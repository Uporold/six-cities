import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PlaceCard from "./place-card";
import { hotels } from "../../mock/offers";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should card be hovered`, () => {
  const onCardHover = jest.fn();

  const smallMovieCard = shallow(
    <PlaceCard
      onPlaceCardClick={() => {}}
      hotel={hotels[0]}
      onHover={onCardHover}
    />
  );

  const card = smallMovieCard.find(`.cities__place-card`);

  //card.props().onMouseOver();
  card.simulate(`mouseenter`, hotels[0]);
  expect(onCardHover.mock.calls.length).toBe(1);
  expect(onCardHover.mock.calls[0][0]).toMatchObject(hotels[0]);
});
