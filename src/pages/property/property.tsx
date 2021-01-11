import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import Header from "../../components/header/header";
import PlacesList from "../../components/places-list/places-list";
import PropertyReviews from "../../components/property-reviews/property-reviews";
import Map from "../../components/map/map";
import { useChangeHotelFavoriteStatus } from "../../redux/data/hooks/useChangeHotelFavoriteStatus";
import { useLoadHotelReviews } from "../../redux/data/hooks/useLoadHotelReviews";
import { useLoadNearbyHotels } from "../../redux/data/hooks/useLoadNearbyHotels";
import {
  useCurrentHotel,
  useNearbyHotels,
  useHotelReviews,
} from "../../redux/data/hooks/selectors";
import { PageType } from "../../utilites/const";
import {Page} from "../../utilites/types";

interface MatchParams {
  id: string;
}

type Props = RouteComponentProps<MatchParams>;

const Property: React.FC<Props> = ({ match }): JSX.Element => {
  const hotelId = match.params.id;
  const hotel = useCurrentHotel(hotelId);
  const changeHotelFavoriteStatus = useChangeHotelFavoriteStatus();
  const loadHotelReviews = useLoadHotelReviews();
  const loadNearbyHotels = useLoadNearbyHotels();
  const nearbyHotels = useNearbyHotels();
  const hotelReviews = useHotelReviews();

  const styledRating = hotel.rating * 20;
  const center = [hotel.city.location.latitude, hotel.city.location.longitude];
  const zoom = [hotel.city.location.zoom];

  useEffect(() => {
    loadHotelReviews(hotelId);
    loadNearbyHotels(hotelId);
  }, [hotelId, loadHotelReviews, loadNearbyHotels]);

  const onFavoriteButtonClickHandler = (
    id: number,
    isFavorite: boolean,
  ) => () => {
    changeHotelFavoriteStatus(id, isFavorite);
  };

  const renderPropertyImages = () => {
    const { images } = hotel;
    return images.map((image) => (
      <div className="property__image-wrapper" key={image}>
        <img className="property__image" src={image} alt="Photo studio" />
      </div>
    ));
  };

  const renderPremiumMark = () => {
    const { isPremium } = hotel;
    return isPremium ? (
      <div className="property__mark">
        <span>Premium</span>
      </div>
    ) : (
      ``
    );
  };

  const renderInsideList = () => {
    const { goods } = hotel;
    return goods.map((good) => (
      <li className="property__inside-item" key={good}>
        {good}
      </li>
    ));
  };

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              <div className="property__image-wrapper">
                <img
                  className="property__image"
                  src={hotel.previewImage}
                  alt="Photo studio"
                />
              </div>
              {renderPropertyImages()}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {renderPremiumMark()}
              <div className="property__name-wrapper">
                <h1 className="property__name">{hotel.title}</h1>
                <button
                  className={`property__bookmark-button ${
                    hotel.isFavorite ? `property__bookmark-button--active` : ``
                  } button`}
                  type="button"
                  onClick={onFavoriteButtonClickHandler(
                    hotel.id,
                    !hotel.isFavorite,
                  )}
                >
                  <svg
                    className="place-card__bookmark-icon"
                    width="31"
                    height="33"
                  >
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: `${styledRating}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">
                  {hotel.rating}
                </span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  Entire place
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {hotel.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {hotel.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{hotel.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">{renderInsideList()}</ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div
                    className={`property__avatar-wrapper ${
                      hotel.host.isPro ? `property__avatar-wrapper--pro` : ``
                    } user__avatar-wrapper`}
                  >
                    <img
                      className="property__avatar user__avatar"
                      src={`/${hotel.host.avatarUrl}`}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">{hotel.host.name}</span>
                  {hotel.host.isPro && (
                    <span className="property__user-status">Pro</span>
                  )}
                </div>
                <div className="property__description">
                  <p className="property__text">{hotel.description}</p>
                </div>
              </div>
              <PropertyReviews reviews={hotelReviews} hotelId={hotel.id} />
            </div>
          </div>
          <section className="property__map map">
            <Map
              hotels={[hotel, ...nearbyHotels]}
              currentHotelId={hotel.id}
              center={center}
              zoom={zoom}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <PlacesList hotels={nearbyHotels} pageType={PageType.PROPERTY as Page} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Property;
