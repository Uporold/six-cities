import React, { memo } from "react";
import { sortTypes } from "../../utilites/const";
import { useSort } from "../../hooks/useSort";
import { Sort } from "../../utilites/types";

const arrowActiveStyle = {
  transform: `rotate(180deg)`,
  top: `45%`,
};

interface Props {
  currentCity: string;
}

const Sorting: React.FC<Props> = memo(function Sorting({
  currentCity,
}): JSX.Element {
  const {
    isSortOpen,
    setSortFormOpenStatus,
    currentSortType,
    setSortType,
  } = useSort(currentCity);

  const onSortFormClick = () => {
    setSortFormOpenStatus(!isSortOpen);
  };

  const sortItemClickHandler = (sortType: Sort) => (evt: React.MouseEvent) => {
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
        tabIndex={0}
        onClick={onSortFormClick}
      >
        {currentSortType}
        <svg
          className="places__sorting-arrow"
          width="7"
          height="4"
          style={isSortOpen ? arrowActiveStyle : {}}
        >
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${
          isSortOpen ? `places__options--opened` : ``
        }`}
      >
        {sortTypes.map((sortType) => (
          <li
            key={sortType}
            onClick={sortItemClickHandler(sortType)}
            className={`places__option ${
              sortType === currentSortType ? `places__option--active` : ``
            }`}
            tabIndex={0}
          >
            {sortType}
          </li>
        ))}
      </ul>
    </form>
  );
});

export default Sorting;
