import React, { memo } from "react";
import { getDate } from "../../utilites/util";
import { Review } from "../../utilites/types";

interface Props {
  review: Review;
}

const PropertyReview: React.FC<Props> = memo(function PropertyReview({
  review,
}): JSX.Element {
  const date = getDate(review.date);
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div
          className={`reviews__avatar-wrapper user__avatar-wrapper  ${
            review.user.isPro ? `property__avatar-wrapper--pro` : ``
          }`}
        >
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatar}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${20 * review.rating}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{review.comment}</p>
        <time className="reviews__time" dateTime={review.date}>
          {date}
        </time>
      </div>
    </li>
  );
});

export default PropertyReview;
