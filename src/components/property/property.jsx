import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "../header/header";
import PlacesList from "../places-list/places-list";
import PropertyReviews from "../property-reviews/property-reviews";
import { projectPropTypes } from "../../utilites/project-prop-types";
import Map from "../map/map";
import { Operation } from "../../redux/data/data";
import NameSpace from "../../redux/name-space";

class Property extends PureComponent {
  componentDidMount() {
    const { hotel, getReviews } = this.props;
    getReviews(hotel.id);
  }

  componentDidUpdate(prevProps) {
    const { hotel, getReviews } = this.props;
    if (prevProps.hotel.id !== hotel.id) {
      getReviews(hotel.id);
    }
  }

  getNearestHotels() {
    const { hotels, hotel } = this.props;
    return hotels
      .filter(
        (item) => item.id !== hotel.id && item.city.name === hotel.city.name
      )
      .slice(0, 3);
  }

  renderPropertyImages() {
    const { images } = this.props.hotel;
    return images.map((image) => (
      <div className="property__image-wrapper">
        <img className="property__image" src={image} alt="Photo studio" />
      </div>
    ));
  }

  renderPremiumMark() {
    const { isPremium } = this.props.hotel;
    return isPremium ? (
      <div className="property__mark">
        <span>Premium</span>
      </div>
    ) : (
      ``
    );
  }

  renderInsideList() {
    const { goods } = this.props.hotel;
    return goods.map((good) => (
      <li className="property__inside-item">{good}</li>
    ));
  }

  render() {
    const { hotel, hotelReviews } = this.props;
    const {
      previewImage,
      title,
      rating,
      bedrooms,
      maxAdults,
      price,
      host,
      description,
    } = hotel;
    const styledRating = rating * 20;
    const center = [
      hotel.city.location.latitude,
      hotel.city.location.longitude,
    ];
    const zoom = [hotel.city.location.zoom];
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
                    src={previewImage}
                    alt="Photo studio"
                  />
                </div>
                {this.renderPropertyImages()}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {this.renderPremiumMark()}
                <div className="property__name-wrapper">
                  <h1 className="property__name">{title}</h1>
                  <button
                    className="property__bookmark-button button"
                    type="button"
                  >
                    <svg
                      className="property__bookmark-icon"
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
                    {rating}
                  </span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    Entire place
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {this.renderInsideList()}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                      <img
                        className="property__avatar user__avatar"
                        src={`/${host.avatarUrl}`}
                        width="74"
                        height="74"
                        alt="Host avatar"
                      />
                    </div>
                    <span className="property__user-name">{host.name}</span>
                    {host.isPro ? (
                      <span className="property__user-status">Pro</span>
                    ) : (
                      ``
                    )}
                  </div>
                  <div className="property__description">
                    <p className="property__text">{description}</p>
                  </div>
                </div>
                <PropertyReviews reviews={hotelReviews} />
              </div>
            </div>
            <section className="property__map map">
              <Map
                hotels={[hotel, ...this.getNearestHotels()]}
                currentHotel={hotel}
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
              <PlacesList hotels={this.getNearestHotels()} />
            </section>
          </div>
        </main>
      </div>
    );
  }
}

// const Property = ({ hotel, hotels, getReviews, hotelReviews }) => {
//   const {
//     previewImage,
//     images,
//     isPremium,
//     title,
//     rating,
//     bedrooms,
//     maxAdults,
//     price,
//     goods,
//     host,
//     description,
//   } = hotel;
//
//   useEffect(() => {
//     getReviews(hotel.id);
//   }, [hotel]);
//   const styledRating = rating * 20;
//   const zoom = 13;
//
//   const getNearestHotels = () => {
//     return hotels.filter((item) => item.id !== hotel.id).slice(0, 3);
//   };
//
//   const renderPropertyImages = () => {
//     return images.map((image) => (
//       <div className="property__image-wrapper">
//         <img className="property__image" src={image} alt="Photo studio" />
//       </div>
//     ));
//   };
//
//   const renderPremiumMark = () => {
//     return isPremium ? (
//       <div className="property__mark">
//         <span>Premium</span>
//       </div>
//     ) : (
//       ``
//     );
//   };
//
//   const renderInsideList = () => {
//     return goods.map((good) => (
//       <li className="property__inside-item">{good}</li>
//     ));
//   };
//   return (
//     <div className="page">
//       <Header />
//       <main className="page__main page__main--property">
//         <section className="property">
//           <div className="property__gallery-container container">
//             <div className="property__gallery">
//               <div className="property__image-wrapper">
//                 <img
//                   className="property__image"
//                   src={previewImage}
//                   alt="Photo studio"
//                 />
//               </div>
//               {renderPropertyImages()}
//             </div>
//           </div>
//           <div className="property__container container">
//             <div className="property__wrapper">
//               {renderPremiumMark()}
//               <div className="property__name-wrapper">
//                 <h1 className="property__name">{title}</h1>
//                 <button
//                   className="property__bookmark-button button"
//                   type="button"
//                 >
//                   <svg
//                     className="property__bookmark-icon"
//                     width="31"
//                     height="33"
//                   >
//                     <use xlinkHref="#icon-bookmark" />
//                   </svg>
//                   <span className="visually-hidden">To bookmarks</span>
//                 </button>
//               </div>
//               <div className="property__rating rating">
//                 <div className="property__stars rating__stars">
//                   <span style={{ width: `${styledRating}%` }} />
//                   <span className="visually-hidden">Rating</span>
//                 </div>
//                 <span className="property__rating-value rating__value">
//                   {rating}
//                 </span>
//               </div>
//               <ul className="property__features">
//                 <li className="property__feature property__feature--entire">
//                   Entire place
//                 </li>
//                 <li className="property__feature property__feature--bedrooms">
//                   {bedrooms} Bedrooms
//                 </li>
//                 <li className="property__feature property__feature--adults">
//                   Max {maxAdults} adults
//                 </li>
//               </ul>
//               <div className="property__price">
//                 <b className="property__price-value">&euro;{price}</b>
//                 <span className="property__price-text">&nbsp;night</span>
//               </div>
//               <div className="property__inside">
//                 <h2 className="property__inside-title">What&apos;s inside</h2>
//                 <ul className="property__inside-list">{renderInsideList()}</ul>
//               </div>
//               <div className="property__host">
//                 <h2 className="property__host-title">Meet the host</h2>
//                 <div className="property__host-user user">
//                   <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
//                     <img
//                       className="property__avatar user__avatar"
//                       src={`/${host.avatarUrl}`}
//                       width="74"
//                       height="74"
//                       alt="Host avatar"
//                     />
//                   </div>
//                   <span className="property__user-name">{host.name}</span>
//                   {host.isPro ? (
//                     <span className="property__user-status">Pro</span>
//                   ) : (
//                     ``
//                   )}
//                 </div>
//                 <div className="property__description">
//                   <p className="property__text">{description}</p>
//                 </div>
//               </div>
//               <PropertyReviews reviews={hotelReviews} />
//             </div>
//           </div>
//           <section className="property__map map">
//             <Map
//               hotels={[hotel, ...getNearestHotels()]}
//               currentHotel={hotel}
//               center={[hotel.location.latitude, hotel.location.longitude]}
//               zoom={zoom}
//             />
//           </section>
//         </section>
//         <div className="container">
//           <section className="near-places places">
//             <h2 className="near-places__title">
//               Other places in the neighbourhood
//             </h2>
//             <PlacesList hotels={getNearestHotels()} />
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// };

Property.propTypes = {
  hotel: projectPropTypes.HOTEL.isRequired,
  hotels: PropTypes.arrayOf(projectPropTypes.HOTEL.isRequired).isRequired,
  getReviews: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  hotelReviews: state[NameSpace.DATA].hotelReviews,
});

const mapDispatchToProps = (dispatch) => ({
  getReviews(id) {
    dispatch(Operation.loadHotelReviews(id));
  },
});

export { Property };
export default connect(mapStateToProps, mapDispatchToProps)(Property);
