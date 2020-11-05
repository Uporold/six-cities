import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "../header/header";
import {
  getCitiesOfFavoriteHotels,
  getFavoriteHotels,
} from "../../redux/data/selectors";
import { Operation } from "../../redux/data/data";
import FavoritesLocations from "../favorites-locations/favorites-locations";
import { projectPropTypes } from "../../utilites/project-prop-types";
import Footer from "../footer/footer";

class Favorites extends PureComponent {
  componentDidMount() {
    const { loadFavorites } = this.props;
    loadFavorites();
  }

  render() {
    const { cities, favoriteHotels } = this.props;
    return (
      <div className="page">
        <Header />

        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {cities.map((city) => (
                  <FavoritesLocations
                    key={`favorite-list-block-${city}`}
                    city={city}
                    hotels={favoriteHotels.filter(
                      (item) => item.city.name === city
                    )}
                  />
                ))}
              </ul>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

Favorites.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  favoriteHotels: PropTypes.arrayOf(projectPropTypes.HOTEL.isRequired)
    .isRequired,
  loadFavorites: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cities: getCitiesOfFavoriteHotels(state),
  favoriteHotels: getFavoriteHotels(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadFavorites() {
    dispatch(Operation.loadFavoriteHotels());
  },
});

export { Favorites };
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
