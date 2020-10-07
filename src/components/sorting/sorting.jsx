import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { sortTypes } from "../../utilites/util";
import { ActionCreator } from "../../redux/reducer";

class Sorting extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isSortOpen: false,
    };
  }

  componentDidUpdate(prevProps) {
    this.closeSortForm(prevProps);
  }

  onSortFormClick() {
    const { isSortOpen } = this.state;
    this.setState({ isSortOpen: !isSortOpen });
  }

  sortListClickHandler(evt) {
    const { currentSortType, onSortingTabClick } = this.props;
    evt.preventDefault();
    const { sortType } = evt.target.dataset;
    if (sortType && sortType !== currentSortType) {
      onSortingTabClick(sortType);
    }
  }

  closeSortForm(prevProps) {
    const { currentCity } = this.props;
    const { isSortOpen } = this.state;
    if (prevProps.currentCity !== currentCity && isSortOpen) {
      this.setState({ isSortOpen: false });
    }
  }

  render() {
    const { currentSortType } = this.props;
    const { isSortOpen } = this.state;
    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span
          className="places__sorting-type"
          tabIndex="0"
          onClick={() => {
            this.onSortFormClick();
          }}
        >
          {currentSortType}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select" />
          </svg>
        </span>
        <ul
          onClick={(evt) => {
            this.sortListClickHandler(evt);
          }}
          className={`places__options places__options--custom ${
            isSortOpen ? `places__options--opened` : ``
          }`}
        >
          {Object.keys(sortTypes).map((key) => (
            <li
              data-sort-type={sortTypes[key]}
              className={`places__option ${
                sortTypes[key] === currentSortType
                  ? `places__option--active`
                  : ``
              }`}
              tabIndex="0"
            >
              {sortTypes[key]}
            </li>
          ))}
        </ul>
      </form>
    );
  }
}

Sorting.propTypes = {
  onSortingTabClick: PropTypes.func.isRequired,
  currentSortType: PropTypes.string.isRequired,
  currentCity: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currentCity: state.currentCity,
});

const mapDispatchToProps = (dispatch) => ({
  onSortingTabClick(sortType) {
    dispatch(ActionCreator.setSort(sortType));
  },
});

export { Sorting };
export default connect(mapStateToProps, mapDispatchToProps)(Sorting);
