import { GlobalState } from "../reducer";

export const getCurrentCity = (state: GlobalState) => state.APP.currentCity;
export const getCurrentSortType = (state: GlobalState) =>
  state.APP.currentSortType;

export const getHoveredHotelId = (state: GlobalState) =>
  state.APP.hoveredHotelId;
