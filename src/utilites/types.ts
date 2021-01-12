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

export interface Review extends ReviewPure {
  id: number;
  user: User;
  // rating: number;
  // comment: string;
  date: string;
}

export interface ReviewPure {
  comment: string;
  rating: number;
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

export type Sort =
  | `Popular`
  | `Price: low to high`
  | `Price: high to low`
  | `Top rated first`;
