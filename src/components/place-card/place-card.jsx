import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { projectPropTypes } from "../../utilites/project-prop-types";

const PlaceCard = ({ hotel, onHover, onHotelCardOut }) => {
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

  return (
    <>
      <article
        className="cities__place-card place-card"
        key={`${hotel.id}`}
        onMouseEnter={() => {
          onHover(hotel);
        }}
        onMouseOut={() => {
          onHotelCardOut();
        }}
      >
        {renderPremiumMark()}
        <div className="cities__image-wrapper place-card__image-wrapper">
          <Link to={`/offers/${hotel.id}`}>
            <img
              className="place-card__image"
              src={hotel.previewImage}
              width="260"
              height="200"
              alt={hotel.title}
            />
          </Link>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{hotel.price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button
              className="place-card__bookmark-button button"
              type="button"
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
  onHover: PropTypes.func.isRequired,
  onHotelCardOut: PropTypes.func.isRequired,
};

export default PlaceCard;
