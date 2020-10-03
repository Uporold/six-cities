import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import PlaceCard from "../place-card/place-card";
import { projectPropTypes } from "../../utilites/project-prop-types";
import { ActionCreator } from "../../redux/reducer";

class PlacesList extends PureComponent {
  render() {
    const { hotels, isMain, onHotelCardHover, onHotelCardOut } = this.props;
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
            onHover={onHotelCardHover}
            onHotelCardOut={onHotelCardOut}
          />
        ))}
      </div>
    );
  }
}

PlacesList.propTypes = {
  hotels: PropTypes.arrayOf(projectPropTypes.HOTEL.isRequired).isRequired,
  isMain: PropTypes.bool,
  onHotelCardHover: PropTypes.func.isRequired,
  onHotelCardOut: PropTypes.func.isRequired,
};

PlacesList.defaultProps = {
  isMain: false,
};

const mapDispatchToProps = (dispatch) => ({
  onHotelCardHover(hotel) {
    dispatch(ActionCreator.getHoveredHotelId(hotel));
  },
  onHotelCardOut() {
    dispatch(ActionCreator.resetHoveredHotelId());
  },
});

export { PlacesList };
export default connect(null, mapDispatchToProps)(PlacesList);
