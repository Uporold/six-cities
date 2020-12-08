import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "../../components/header/header";
import {
  getCitiesOfFavoriteHotels,
  getErrorHotelIds,
  getFavoriteHotels,
  getFavoritesLoadingStatus,
} from "../../redux/data/selectors";
import {
  ActionCreator as ActionCreatorData,
  Operation,
} from "../../redux/data/data";
import { projectPropTypes } from "../../utilites/project-prop-types";
import Footer from "../../components/footer/footer";
import FavoritesLists from "../../components/favorites-lists/favorites-lists";
import FavoritesEmpty from "../../components/favorites-empty/favorites-empty";
import LoaderSpinner from "../../components/loader-spinner/loader-spinner";

class Favorites extends PureComponent {
  componentDidMount() {
    const { loadFavorites, errorHotelIds, clearErrorHotelIds } = this.props;
    loadFavorites();
    if (errorHotelIds.length > 0) {
      clearErrorHotelIds();
    }
  }

  render() {
    const { cities, favoriteHotels, isFavoritesLoading } = this.props;
    return (
      <>
        {!isFavoritesLoading ? (
          <div className="page">
            <Header />

            <main className="page__main page__main--favorites">
              <div className="page__favorites-container container">
                {favoriteHotels.length ? (
                  <FavoritesLists
                    cities={cities}
                    favoriteHotels={favoriteHotels}
                  />
                ) : (
                  <FavoritesEmpty />
                )}
              </div>
            </main>
            <Footer />
          </div>
        ) : (
          <LoaderSpinner />
        )}
      </>
    );
  }
}

Favorites.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  favoriteHotels: PropTypes.arrayOf(projectPropTypes.HOTEL.isRequired)
    .isRequired,
  isFavoritesLoading: PropTypes.bool.isRequired,
  loadFavorites: PropTypes.func.isRequired,
  errorHotelIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  clearErrorHotelIds: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cities: getCitiesOfFavoriteHotels(state),
  favoriteHotels: getFavoriteHotels(state),
  isFavoritesLoading: getFavoritesLoadingStatus(state),
  errorHotelIds: getErrorHotelIds(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadFavorites() {
    dispatch(Operation.loadFavoriteHotels());
  },
  clearErrorHotelIds() {
    dispatch(ActionCreatorData.clearErrorHotelIds());
  },
});

export { Favorites };
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
