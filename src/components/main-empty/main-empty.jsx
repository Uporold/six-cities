import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentCity } from "../../redux/app/selectors";

const MainEmpty = ({ currentCity }) => {
  return (
    <div className="cities__places-container cities__places-container--empty container">
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">No places to stay available</b>
          <p className="cities__status-description">
            We could not find any property available at the moment in{" "}
            {currentCity}
          </p>
        </div>
      </section>
      <div className="cities__right-section" />
    </div>
  );
};

MainEmpty.propTypes = {
  currentCity: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currentCity: getCurrentCity(state),
});

export { MainEmpty };
export default connect(mapStateToProps, null)(MainEmpty);
