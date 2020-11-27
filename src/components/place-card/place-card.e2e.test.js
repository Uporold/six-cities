import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { PlaceCard } from "./place-card";
import { hotels } from "../../mock/offers";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Should card be hovered`, () => {
  let onCardHover;
  let onFavButtonClick;
  let smallMovieCard;

  beforeEach(() => {
    onCardHover = jest.fn();
    onFavButtonClick = jest.fn();

    smallMovieCard = shallow(
      <PlaceCard
        hotel={hotels[0]}
        clearErrorHotelIds={jest.fn()}
        errorHotelIds={[]}
        onButtonClick={onFavButtonClick}
        onCardHover={onCardHover}
        pageType="MAIN"
      />
    );
  });

  it(`Card mouse enter and mouseout tests`, () => {
    const card = smallMovieCard.find(`.cities__place-card`);

    card.props().onMouseEnter();
    card.props().onMouseOut();

    expect(onCardHover.mock.calls.length).toBe(2);
    expect(onCardHover.mock.calls[0][0]).toBe(hotels[0].id);
    expect(onCardHover.mock.calls[1][0]).toBe(-1);
  });

  it(`Card favorite button test`, () => {
    const button = smallMovieCard.find(`button.place-card__bookmark-button`);
    const evt = { preventDefault: jest.fn() };

    button.props().onClick(evt);

    expect(onFavButtonClick.mock.calls.length).toBe(1);
    expect(onFavButtonClick.mock.calls[0][0]).toBe(hotels[0].id);
    expect(onFavButtonClick.mock.calls[0][1]).toBe(!hotels[0].isFavorite);
  });
});
