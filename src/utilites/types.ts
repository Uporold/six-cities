export interface Hotel {
  id: number;
  type: string;
  previewImage: string;
  title: string;
  price: number;
  isPremium: boolean;
  isFavorite: boolean;
  images: Array<string>;
  rating: number;
  bedrooms: number;
  maxAdults: number;
  goods: Array<string>;
  description: string;
  host: {
    id: number;
    name: string;
    isPro: boolean;
    avatarUrl: string;
  };
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
}

export interface HotelBackend {
  id: number;
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  title: string;
  [`preview_image`]: string;
  images: Array<string>;
  price: number;
  type: string;
  rating: number;
  [`is_premium`]: boolean;
  [`is_favorite`]: boolean;
  bedrooms: number;
  description: string;
  [`max_adults`]: number;
  goods: Array<string>;
  host: {
    id: number;
    name: string;
    [`is_pro`]: boolean;
    [`avatar_url`]: string;
  };
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
}

export interface Review extends ReviewPure {
  id: number;
  user: User;
  date: string;
}

export interface ReviewPure {
  comment: string;
  rating: number;
}

export interface ReviewBackend {
  id: number;
  user: {
    id: number;
    [`is_pro`]: boolean;
    name: string;
    avatar_url: string;
  };
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  id: number;
  isPro: boolean;
  name: string;
  avatar: string;
}

export interface UserLogged extends User {
  email: string;
}

export interface UserBackend {
  id: number;
  email: string;
  name: string;
  avatar_url: string;
  [`is_pro`]: boolean;
}

export type Page = `MAIN` | `PROPERTY` | `FAVORITES`;

export type Sort =
  | `Popular`
  | `Price: low to high`
  | `Price: high to low`
  | `Top rated first`;
