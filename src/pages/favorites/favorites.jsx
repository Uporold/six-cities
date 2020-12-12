import React, { useEffect } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import FavoritesLists from "../../components/favorites-lists/favorites-lists";
import FavoritesEmpty from "../../components/favorites-empty/favorites-empty";
import LoaderSpinner from "../../components/loader-spinner/loader-spinner";
import { useClearErrorIds } from "../../redux/data/hooks/useClearErrorIds";
import { useLoadFavoriteHotels } from "../../redux/data/hooks/useLoadFavoriteHotels";
import {
  useErrorHotelIds,
  useFavoritesLoadingStatus,
  useFavoriteHotels,
  useCitiesOfFavoriteHotels,
} from "../../redux/data/hooks/selectors";

const Favorites = () => {
  const clearErrorIds = useClearErrorIds();
  const errorHotelIds = useErrorHotelIds();
  const loadFavoritesHotels = useLoadFavoriteHotels();
  const isFavoritesLoading = useFavoritesLoadingStatus();
  const favoriteHotels = useFavoriteHotels();
  const cities = useCitiesOfFavoriteHotels();

  useEffect(() => {
    loadFavoritesHotels();
    if (errorHotelIds.length > 0) {
      clearErrorIds();
    }
  }, [clearErrorIds, errorHotelIds.length, loadFavoritesHotels]);

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
};

export default Favorites;
