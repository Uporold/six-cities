import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "../header/header";
import {
  getCitiesOfFavoriteHotels,
  getFavoriteHotels,
  getFavoritesLoadingStatus,
} from "../../redux/data/selectors";
import { Operation } from "../../redux/data/data";
import { projectPropTypes } from "../../utilites/project-prop-types";
import Footer from "../footer/footer";
import Favorites from "../favorites/favorites";
import FavoritesEmpty from "../../favorites-empty/favorites-empty";
import LoaderSpinner from "../loader-spinner/loader-spinner";

class FavoritesPage extends PureComponent {
  componentDidMount() {
    const { loadFavorites } = this.props;
    loadFavorites();
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
                  <Favorites cities={cities} favoriteHotels={favoriteHotels} />
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

FavoritesPage.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  favoriteHotels: PropTypes.arrayOf(projectPropTypes.HOTEL.isRequired)
    .isRequired,
  isFavoritesLoading: PropTypes.bool.isRequired,
  loadFavorites: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cities: getCitiesOfFavoriteHotels(state),
  favoriteHotels: getFavoriteHotels(state),
  isFavoritesLoading: getFavoritesLoadingStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadFavorites() {
    dispatch(Operation.loadFavoriteHotels());
  },
});

export { FavoritesPage };
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);
