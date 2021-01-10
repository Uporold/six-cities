export const PageType = {
  MAIN: `MAIN`,
  PROPERTY: `PROPERTY`,
  FAVORITES: `FAVORITES`,
};

export const cities = [
  `Paris`,
  `Cologne`,
  `Brussels`,
  `Amsterdam`,
  `Hamburg`,
  `Dusseldorf`,
];

export const months = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

export const PagePath = {
  MAIN: `/`,
  PROPERTY: (id: number | string = `:id`): string => `/offers/${id}`,
  FAVORITES: `/favorites`,
  LOGIN: `/login`,
};
