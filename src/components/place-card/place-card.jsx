import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { projectPropTypes } from "../../utilites/project-prop-types";
import { ActionCreator } from "../../redux/app/app";
import {
  Operation,
  ActionCreator as ActionCreatorData,
} from "../../redux/data/data";
import { PageType } from "../../utilites/const";
import NameSpace from "../../redux/name-space";
import PlaceCardError from "../place-card-error/place-card-error";

const pageTypeToCardClass = {
  [PageType.MAIN]: `cities__place-card`,
  [PageType.PROPERTY]: `near-places__card`,
  [PageType.FAVORITES]: `favorites__card`,
};

const pageTypeToImageWrapperClass = {
  [PageType.MAIN]: `cities__image-wrapper`,
  [PageType.PROPERTY]: `near-places__image-wrapper`,
  [PageType.FAVORITES]: `favorites__image-wrapper`,
};

const PlaceCard = ({
  hotel,
  onCardHover,
  onButtonClick,
  pageType,
  errorHotelIds,
  clearErrorHotelIds,
}) => {
  const styledRating = hotel.rating * 20;
  const renderPremiumMark = () => {
    return hotel.isPremium ? (
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
    ) : (
      ``
    );
  };
  const hotelType =
    hotel.type.charAt(0).toUpperCase() + hotel.type.replace(`-`, ` `).slice(1);

  const onCardMouseEnter = () => {
    onCardHover(hotel.id);
  };

  const onCardMouseOut = () => {
    onCardHover(-1);
  };

  const onCardClickHandler = () => {
    onCardMouseOut();
    clearErrorHotelIds();
  };

  const onButtonClickHandler = (hotelId, isFavorite) => (evt) => {
    evt.preventDefault();
    onButtonClick(hotelId, isFavorite);
  };

  return (
    <>
      <article
        className={`${pageTypeToCardClass[pageType]} place-card`}
        key={`${hotel.id}`}
        onMouseEnter={onCardMouseEnter}
        onMouseOut={onCardMouseOut}
      >
        {errorHotelIds.some((id) => id === hotel.id) && (
          <PlaceCardError hotelId={hotel.id} />
        )}
        {renderPremiumMark()}
        <div
          className={`${pageTypeToImageWrapperClass[pageType]} place-card__image-wrapper`}
        >
          <Link onClick={onCardClickHandler} to={`/offers/${hotel.id}`}>
            <img
              className="place-card__image"
              src={hotel.previewImage}
              width={pageType === PageType.FAVORITES ? `150` : `260`}
              height={pageType === PageType.FAVORITES ? `110` : `200`}
              alt={hotel.title}
            />
          </Link>
        </div>
        <div
          className={`${
            pageType === PageType.FAVORITES && `favorites__card-info`
          } place-card__info`}
        >
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{hotel.price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button
              className={`place-card__bookmark-button ${
                hotel.isFavorite ? ` place-card__bookmark-button--active` : ``
              } button`}
              type="button"
              onClick={onButtonClickHandler(hotel.id, !hotel.isFavorite)}
            >
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark" />
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{ width: `${styledRating}%` }} />
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <Link to={`/offers/${hotel.id}`}>{hotel.title}</Link>
          </h2>
          <p className="place-card__type">{hotelType}</p>
        </div>
      </article>
    </>
  );
};

PlaceCard.propTypes = {
  hotel: projectPropTypes.HOTEL.isRequired,
  onCardHover: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  pageType: PropTypes.string.isRequired,
  errorHotelIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  clearErrorHotelIds: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errorHotelIds: state[NameSpace.DATA].errorHotelIds,
});

const mapDispatchToProps = (dispatch) => ({
  onCardHover(hotel) {
    dispatch(ActionCreator.getHoveredHotelId(hotel));
  },
  onButtonClick(hotelId, isFavorite) {
    dispatch(Operation.changeHotelFavoriteStatus(hotelId, isFavorite));
  },
  clearErrorHotelIds() {
    dispatch(ActionCreatorData.clearErrorHotelIds());
  },
});

export { PlaceCard };
export default connect(mapStateToProps, mapDispatchToProps)(PlaceCard);
