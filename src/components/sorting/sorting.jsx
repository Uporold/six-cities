import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { sortTypes } from "../../utilites/util";
import { ActionCreator } from "../../redux/reducer";

const Sorting = ({
  onSortingTabClick,
  currentSortType,
  isSortOpen,
  onSortFormClick,
}) => {
  const sortListClickHandler = (evt) => {
    evt.preventDefault();
    const { sortType } = evt.target.dataset;
    if (sortType && sortType !== currentSortType) {
      onSortingTabClick(sortType);
    }
  };
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex="0"
        onClick={() => {
          onSortFormClick();
        }}
      >
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul
        onClick={(evt) => {
          sortListClickHandler(evt);
        }}
        className={`places__options places__options--custom ${
          isSortOpen ? `places__options--opened` : ``
        }`}
      >
        {Object.keys(sortTypes).map((key) => (
          <li
            data-sort-type={sortTypes[key]}
            className={`places__option ${
              sortTypes[key] === currentSortType ? `places__option--active` : ``
            }`}
            tabIndex="0"
          >
            {sortTypes[key]}
          </li>
        ))}
      </ul>
    </form>
  );
};

Sorting.propTypes = {
  onSortingTabClick: PropTypes.func.isRequired,
  currentSortType: PropTypes.string.isRequired,
  onSortFormClick: PropTypes.func.isRequired,
  isSortOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isSortOpen: state.isSortOpen,
});

const mapDispatchToProps = (dispatch) => ({
  onSortFormClick() {
    dispatch(ActionCreator.setSortFormStatus());
  },
});

export { Sorting };
export default connect(mapStateToProps, mapDispatchToProps)(Sorting);
