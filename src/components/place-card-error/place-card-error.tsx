import React from "react";
import PropTypes from "prop-types";
import { useErrorMessage } from "../../redux/data/hooks/selectors";
import { useRemoveErrorHotelId } from "../../redux/data/hooks/useRemoveErrorHotelId";

const styles = {
  position: `absolute`,
  top: `0`,
  left: `0`,
  width: `100%`,
  height: `100%`,
  zIndex: `999`,
  background: `rgba(50,50,50,0.6)`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  color: `white`,
  cursor: `pointer`,
  flexDirection: `column`,
};

interface Props {
  hotelId: number;
}

const PlaceCardError: React.FC<Props> = ({ hotelId }): JSX.Element => {
  const errorMessage = useErrorMessage();
  const removeErrorHotelId = useRemoveErrorHotelId();
  const onCloseClickHandler = () => {
    removeErrorHotelId(hotelId);
  };
  return (
    <div style={styles as React.CSSProperties} onClick={onCloseClickHandler}>
      <p>{errorMessage}</p>
      <p>Click to close</p>
    </div>
  );
};

PlaceCardError.propTypes = {
  hotelId: PropTypes.number.isRequired,
};

export default PlaceCardError;
