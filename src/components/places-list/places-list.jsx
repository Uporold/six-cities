import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import PlaceCard from "../place-card/place-card";
import { projectPropTypes } from "../../utilites/project-prop-types";

class PlacesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activePlaceCard: null,
    };
  }

  render() {
    const { hotels, isMain } = this.props;
    return (
      <div
        className={classNames("places__list", {
          "cities__places-list tabs__content": isMain,
          "near-places__list": !isMain,
        })}
      >
        {hotels.map((hotel) => (
          <PlaceCard
            key={hotel.id}
            hotel={hotel}
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
  hotels: PropTypes.arrayOf(projectPropTypes.HOTEL.isRequired).isRequired,
  isMain: PropTypes.bool,
};

PlacesList.defaultProps = {
  isMain: false,
};

export default PlacesList;
