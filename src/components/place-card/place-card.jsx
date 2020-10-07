import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { projectPropTypes } from "../../utilites/project-prop-types";
import { ActionCreator } from "../../redux/reducer";

const PlaceCard = ({ hotel, onCardHover }) => {
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

  return (
    <>
      <article
        className="cities__place-card place-card"
        key={`${hotel.id}`}
        onMouseEnter={onCardMouseEnter}
        onMouseOut={onCardMouseOut}
      >
        {renderPremiumMark()}
        <div className="cities__image-wrapper place-card__image-wrapper">
          <Link onClick={onCardMouseOut} to={`/offers/${hotel.id}`}>
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
  onCardHover: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onCardHover(hotel) {
    dispatch(ActionCreator.getHoveredHotelId(hotel));
  },
});

export { PlaceCard };
export default connect(null, mapDispatchToProps)(PlaceCard);
