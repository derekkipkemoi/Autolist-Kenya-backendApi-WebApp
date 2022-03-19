import { CARS_LIST,TRENDING_CARS_LIST, FEATURED_CARS_LIST } from "../actions/types";

const DEFAULT_STATE = {
  carsList: [],
  trendingCarsList: [],
  featuredCarsList: [],
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case CARS_LIST:
      return { ...state, carsList: action.payload };

    case TRENDING_CARS_LIST:
      return { ...state, trendingCarsList: action.payload };

    case FEATURED_CARS_LIST:
      return { ...state, featuredCarsList: action.payload };

    default:
      return state;
  }
};
