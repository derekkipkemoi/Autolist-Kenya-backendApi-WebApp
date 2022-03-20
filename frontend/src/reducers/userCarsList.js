import { USER_CARS, GET_USER_FAVOURITE } from "../actions/types";

const DEFAULT_STATE = {
  carsList: [],
  userFavouriteCarsList: [],
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case USER_CARS:
      console.log("[User carList] got carList action");
      return {
        ...state,
        carsList: action.payload,
      };

    case GET_USER_FAVOURITE:
      return {
        ...state,
        userFavouriteCarsList: action.payload,
      };

    default:
      return state;
  }
};
