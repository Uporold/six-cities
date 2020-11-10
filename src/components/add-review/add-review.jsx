import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ActionCreator, Operation } from "../../redux/data/data";
import {
  getSendingErrorStatus,
  getReviewSendingStatus,
} from "../../redux/data/selectors";

const RATING_STARS = [5, 4, 3, 2, 1];

const errorMessageStyle = {
  display: `flex`,
  justifyContent: `center`,
  color: `red`,
};

class AddReview extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      comment: ``,
      stars: 0,
    };
  }

  onRatingChange = (event) => {
    this.setState({ stars: event.target.value });
  };

  onCommentChange = (event) => {
    this.setState({ comment: event.target.value });
  };

  onSubmitFormHandler = (event) => {
    const { hotelId, onFormSubmit } = this.props;
    const { comment, stars } = this.state;
    event.preventDefault();
    const review = {
      comment,
      rating: stars,
    };
    onFormSubmit(hotelId, review);
    event.target.reset();
    this.setState({ stars: 0, comment: `` });
  };

  render() {
    const { onTextInputFocus, isSendingError, isReviewSending } = this.props;
    const { comment, stars } = this.state;
    return (
      <form
        className="reviews__form form"
        action="#"
        method="post"
        onSubmit={this.onSubmitFormHandler}
      >
        <label className="reviews__label form__label" htmlFor="review">
          Your review
        </label>
        <div
          className="reviews__rating-form form__rating"
          onChange={this.onRatingChange}
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
          onChange={this.onCommentChange}
          onFocus={onTextInputFocus}
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
            {isReviewSending ? `Sending...` : `Submit`}
          </button>
        </div>
        {isSendingError && (
          <p style={errorMessageStyle}>
            An unknown error occurred while sending the message. Try again
            later.
          </p>
        )}
      </form>
    );
  }
}

AddReview.propTypes = {
  hotelId: PropTypes.number.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onTextInputFocus: PropTypes.func.isRequired,
  isSendingError: PropTypes.bool.isRequired,
  isReviewSending: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isSendingError: getSendingErrorStatus(state),
  isReviewSending: getReviewSendingStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFormSubmit(movieId, review) {
    dispatch(Operation.sendReview(movieId, review));
  },
  onTextInputFocus() {
    dispatch(ActionCreator.setSendingErrorStatus(false));
  },
});

export { AddReview };

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
