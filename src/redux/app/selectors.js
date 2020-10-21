import NameSpace from "../name-space";

export const getCurrentCity = (state) => state[NameSpace.APP].currentCity;
export const getCurrentSortType = (state) =>
  state[NameSpace.APP].currentSortType;
export const getHoveredHotelId = (state) => state[NameSpace.APP].hoveredHotelId;
