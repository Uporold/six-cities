import {
  Hotel,
  HotelBackend,
  Review,
  ReviewBackend,
  UserBackend,
  UserLogged,
} from "../../utilites/types";

export const hotelAdapter = (data: HotelBackend): Hotel => {
  return {
    id: data.id,
    city: {
      name: data.city.name,
      location: {
        latitude: data.city.location.latitude,
        longitude: data.city.location.longitude,
        zoom: data.city.location.zoom,
      },
    },
    title: data.title,
    previewImage: data.preview_image,
    images: data.images,
    price: data.price,
    type: data.type,
    rating: data.rating,
    isPremium: data.is_premium,
    isFavorite: data.is_favorite,
    bedrooms: data.bedrooms,
    description: data.description,
    maxAdults: data.max_adults,
    goods: data.goods,
    host: {
      id: data.host.id,
      name: data.host.name,
      isPro: data.host.is_pro,
      avatarUrl: data.host.avatar_url,
    },
    location: {
      latitude: data.location.latitude,
      longitude: data.location.longitude,
      zoom: data.location.zoom,
    },
  };
};

export const reviewAdapter = (data: ReviewBackend): Review => {
  return {
    id: data.id,
    user: {
      id: data.user.id,
      isPro: data.user.is_pro,
      name: data.user.name,
      avatar: data.user.avatar_url,
    },
    rating: data.rating,
    comment: data.comment,
    date: data.date,
  };
};

export const createUser = (data: UserBackend): UserLogged => {
  return {
    id: data.id,
    email: data.email,
    name: data.name,
    avatar: `https://4.react.pages.academy${data.avatar_url}`,
    isPro: data.is_pro,
  };
};
