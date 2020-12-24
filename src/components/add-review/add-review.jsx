import React, { useState, memo } from "react";
import PropTypes from "prop-types";
import { useSendReview } from "../../redux/data/hooks/useSendReview";
import {
  useReviewSendingStatus,
  useSendingErrorStatus,
} from "../../redux/data/hooks/selectors";
import { useSetSendingErrorStatus } from "../../redux/data/hooks/useSetSendingErrorStatus";

const RATING_STARS = [5, 4, 3, 2, 1];

const errorMessageStyle = {
  display: `flex`,
  justifyContent: `center`,
  color: `red`,
};

const ButtonText = {
  SENDING: `Sending...`,
  SUBMIT: `Submit`,
};

const AddReview = memo(function AddReview({ hotelId }) {
  const [comment, setComment] = useState(``);
  const [stars, setStars] = useState(0);

  const onCommentChange = (event) => {
    setComment(event.target.value);
  };

  const onRatingChange = (event) => {
    setStars(event.target.value);
  };

  const sendReview = useSendReview();
  const isReviewSending = useReviewSendingStatus();
  const isSendingError = useSendingErrorStatus();
  const setSendingErrorStatus = useSetSendingErrorStatus();

  const onTextInputFocus = (status) => () => {
    setSendingErrorStatus(status);
  };

  const onSubmitFormHandler = (event) => {
    event.preventDefault();
    const review = {
      comment,
      rating: stars,
    };
    sendReview(hotelId, review);
    event.target.reset();
    setComment(``);
    setStars(0);
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={onSubmitFormHandler}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div
        className="reviews__rating-form form__rating"
        onChange={onRatingChange}
      >
        {RATING_STARS.map((elem) => {
          return (
            <React.Fragment key={elem}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={elem}
                id={`${elem}-stars`}
                type="radio"
                disabled={isReviewSending}
              />
              <label
                htmlFor={`${elem}-stars`}
                className="reviews__rating-label form__rating-label"
                title="perfect"
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star" />
                </svg>
              </label>
            </React.Fragment>
          );
        })}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={onCommentChange}
        onFocus={onTextInputFocus(false)}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{" "}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isReviewSending || comment.length < 50 || stars < 1}
        >
          {isReviewSending ? ButtonText.SENDING : ButtonText.SUBMIT}
        </button>
      </div>
      {isSendingError && (
        <p style={errorMessageStyle}>
          An unknown error occurred while sending the message. Try again later.
        </p>
      )}
    </form>
  );
});

AddReview.propTypes = {
  hotelId: PropTypes.number.isRequired,
};

export default AddReview;
