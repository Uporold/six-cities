import React, { memo } from "react";
import PropTypes from "prop-types";
import { sortTypes } from "../../utilites/util";
import { useSort } from "../../hooks/useSort";

const arrowActiveStyle = {
  transform: `rotate(180deg)`,
  top: `45%`,
};

const Sorting = memo(function Sorting({ currentCity }) {
  const {
    isSortOpen,
    setSortFormOpenStatus,
    currentSortType,
    setSortType,
  } = useSort(currentCity);

  const onSortFormClick = () => {
    setSortFormOpenStatus(!isSortOpen);
  };

  const sortItemClickHandler = (sortType) => (evt) => {
    evt.preventDefault();
    if (sortType && sortType !== currentSortType) {
      setSortType(sortType);
    }
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex="0"
        onClick={onSortFormClick}
      >
        {currentSortType}
        <svg
          className="places__sorting-arrow"
          width="7"
          height="4"
          style={isSortOpen ? arrowActiveStyle : null}
        >
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${
          isSortOpen ? `places__options--opened` : ``
        }`}
      >
        {Object.keys(sortTypes).map((key) => (
          <li
            key={sortTypes[key]}
            data-sort-type={sortTypes[key]}
            onClick={sortItemClickHandler(sortTypes[key])}
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
});

Sorting.propTypes = {
  currentCity: PropTypes.string.isRequired,
};

export default Sorting;
