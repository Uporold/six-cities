import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NameSpace from "../../redux/name-space";
import { ActionCreator } from "../../redux/data/data";

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
  return (
    <div
      style={styles}
      onClick={() => {
        onClose(hotelId);
      }}
    >
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
  errorMessage: state[NameSpace.DATA].errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  onClose(hotelId) {
    dispatch(ActionCreator.removeErrorHotelId(hotelId));
  },
});

export { PlaceCardError };
export default connect(mapStateToProps, mapDispatchToProps)(PlaceCardError);
