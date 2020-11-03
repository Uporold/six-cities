import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card";
import { projectPropTypes } from "../../utilites/project-prop-types";
import { PageType } from "../../utilites/const";

const pageTypeToListClass = {
  [PageType.MAIN]: `cities__places-list`,
  [PageType.PROPERTY]: `near-places__list`,
};

class PlacesList extends PureComponent {
  render() {
    const { hotels, pageType } = this.props;
    return (
      <div className={`${pageTypeToListClass[pageType]} places__list`}>
        {hotels.map((hotel) => (
          <PlaceCard key={hotel.id} hotel={hotel} pageType={pageType} />
        ))}
      </div>
    );
  }
}

PlacesList.propTypes = {
  hotels: PropTypes.arrayOf(projectPropTypes.HOTEL.isRequired).isRequired,
  pageType: PropTypes.string.isRequired,
};

export default PlacesList;
