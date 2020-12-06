import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ActionCreator } from "../../redux/data/data";
import { getErrorMessage } from "../../redux/data/selectors";

const styles = {
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  zIndex: "999",
  background: "rgba(50,50,50,0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  cursor: "pointer",
  flexDirection: "column",
};

const PlaceCardError = ({ hotelId, errorMessage, onClose }) => {
  const onCloseClickHandler = () => {
    onClose(hotelId);
  };
  return (
    <div style={styles} onClick={onCloseClickHandler}>
      <p>{errorMessage}</p>
      <p>Click to close</p>
    </div>
  );
};

PlaceCardError.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  hotelId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errorMessage: getErrorMessage(state),
});

const mapDispatchToProps = (dispatch) => ({
  onClose(hotelId) {
    dispatch(ActionCreator.removeErrorHotelId(hotelId));
  },
});

export { PlaceCardError };
export default connect(mapStateToProps, mapDispatchToProps)(PlaceCardError);
