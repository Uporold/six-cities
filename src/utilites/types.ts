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
}

export interface Review {
  user: User;
  rating: number;
  comment: string;
  dateTime: string;
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

export type Page = `MAIN` | `PROPERTY` | `FAVORITES`;
