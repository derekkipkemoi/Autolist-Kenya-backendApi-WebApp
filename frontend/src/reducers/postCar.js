import { POST_CAR, POST_IMAGES } from "../actions/types";

const DEFAULT_STATE = {
  carObject: {},
  message: "",
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case POST_CAR:
      //console.log('[POSted Car] Car Posted Successfully')
      return {
        ...state,
        carObject: action.payload.carObject,
        message: action.payload.message,
      };

    case POST_IMAGES:
      return {
        ...state,
        carObject: action.payload.carObject,
        message: action.payload.message,
      };

    default:
      return state;
  }
};
