import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card";

class PlacesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activePlaceCard: null,
    };
  }

  render() {
    const { hotels, onPlaceCardClick } = this.props;
    return (
      <div className="cities__places-list places__list tabs__content">
        {hotels.map((hotel) => (
          <PlaceCard
            key={hotel.id}
            hotel={hotel}
            onPlaceCardClick={onPlaceCardClick}
            onHover={() => {
              this.setState({ activePlaceCard: hotel });
              console.log(hotel);
            }}
          />
        ))}
      </div>
    );
  }
}

PlacesList.propTypes = {
  hotels: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      previewImage: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      isPremium: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
  onPlaceCardClick: PropTypes.func.isRequired,
};

export default PlacesList;
