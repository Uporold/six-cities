import React, { memo } from "react";
import PropTypes from "prop-types";
import PropertyReview from "../property-review/property-review";
import { projectPropTypes } from "../../utilites/project-prop-types";
import AddReview from "../add-review/add-review";
import { useAuthorizationStatus } from "../../redux/user/hooks/selectors";

const PropertyReviews = memo(({ reviews, hotelId }) => {
  const authorizationStatus = useAuthorizationStatus();
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;
        <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <PropertyReview key={review.comment + review.id} review={review} />
        ))}
      </ul>
      {authorizationStatus && <AddReview hotelId={hotelId} />}
    </section>
  );
});

PropertyReviews.propTypes = {
  reviews: PropTypes.arrayOf(projectPropTypes.REVIEW.isRequired).isRequired,
  hotelId: PropTypes.number.isRequired,
};

export default PropertyReviews;
