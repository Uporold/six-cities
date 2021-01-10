import React, { memo } from "react";
import { Link } from "react-router-dom";
import { PageType, PagePath} from "../../utilites/const";
import PlaceCardError from "../place-card-error/place-card-error";
import history from "../../history";
import { useChangeHotelFavoriteStatus } from "../../redux/data/hooks/useChangeHotelFavoriteStatus";
import { useGetHoveredHotelId } from "../../redux/app/hooks/useGetHoveredHotelId";
import { useClearErrorIds } from "../../redux/data/hooks/useClearErrorIds";
import { useErrorHotelIds } from "../../redux/data/hooks/selectors";
import { useAuthorizationStatus } from "../../redux/user/hooks/selectors";
import { Hotel, Page } from "../../utilites/types";

const pageTypeToCardClass = {
  MAIN: `cities__place-card`,
  PROPERTY: `near-places__card`,
  FAVORITES: `favorites__card`,
};

const pageTypeToImageWrapperClass = {
  MAIN: `cities__image-wrapper`,
  PROPERTY: `near-places__image-wrapper`,
  FAVORITES: `favorites__image-wrapper`,
};

interface Props {
  hotel: Hotel;
  pageType: Page;
}

const PlaceCard: React.FC<Props> = memo(function PlaceCard({
  hotel,
  pageType,
}): JSX.Element {
  const styledRating = hotel.rating * 20;
  const changeHotelFavoriteStatus = useChangeHotelFavoriteStatus();
  const getHoveredHotelId = useGetHoveredHotelId();
  const clearErrorHotelIds = useClearErrorIds();
  const authorizationStatus = useAuthorizationStatus();
  const errorHotelIds = useErrorHotelIds();
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
    getHoveredHotelId(hotel.id);
  };

  const onCardMouseOut = () => {
    getHoveredHotelId(-1);
  };

  const onCardClickHandler = () => {
    onCardMouseOut();
    if (errorHotelIds.length > 0) {
      clearErrorHotelIds();
    }
  };

  const onFavoriteButtonClickHandler = (
    hotelId: number,
    isFavorite: boolean,
  ) => (evt: React.MouseEvent) => {
    evt.preventDefault();
    if (!authorizationStatus) {
      history.push(PagePath.LOGIN);
      return;
    }
    changeHotelFavoriteStatus(hotelId, isFavorite);
  };

  return (
    <>
      <article
        className={`${pageTypeToCardClass[pageType]} place-card`}
        key={`${hotel.id}`}
        onMouseEnter={onCardMouseEnter}
        onMouseLeave={onCardMouseOut}
      >
        {errorHotelIds.some((id: number) => id === hotel.id) && (
          <PlaceCardError hotelId={hotel.id} />
        )}
        {renderPremiumMark()}
        <div
          className={`${pageTypeToImageWrapperClass[pageType]} place-card__image-wrapper`}
        >
          <Link onClick={onCardClickHandler} to={PagePath.PROPERTY(hotel.id)}>
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
            pageType === PageType.FAVORITES ? `favorites__card-info` : ``
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
              onClick={onFavoriteButtonClickHandler(
                hotel.id,
                !hotel.isFavorite,
              )}
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
            <Link to={PagePath.PROPERTY(hotel.id)}>{hotel.title}</Link>
          </h2>
          <p className="place-card__type">{hotelType}</p>
        </div>
      </article>
    </>
  );
});

export default PlaceCard;
