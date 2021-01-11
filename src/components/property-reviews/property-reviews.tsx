import React, { memo } from "react";
import PropertyReview from "../property-review/property-review";
import AddReview from "../add-review/add-review";
import { useAuthorizationStatus } from "../../redux/user/hooks/selectors";
import { Review } from "../../utilites/types";

interface Props {
  reviews: Array<Review>;
  hotelId: number;
}

const PropertyReviews: React.FC<Props> = memo(function PropertyReviews({
  reviews,
  hotelId,
}): JSX.Element {
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

export default PropertyReviews;
