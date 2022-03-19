import {
  CAR_DELETE,
  CAR_APPROVE,
  CAR_DECLINE,
  CAR_SOLD,
  CAR_EDIT,
  CAR_VIEWED,
  ADD_USER_FAVOURITE,
} from "../actions/types";

const DEFAULT_STATE = {
  message: "",
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case CAR_DELETE:
      return { ...state, message: action.payload };

    case CAR_SOLD:
      return { ...state, message: action.payload };

    case CAR_DECLINE:
      return { ...state, message: action.payload };

    case CAR_APPROVE:
      return { ...state, message: action.payload };

    case CAR_EDIT:
      return { ...state, message: action.payload };

    case CAR_VIEWED:
      return { ...state, message: action.payload };

    case ADD_USER_FAVOURITE:
      return { ...state, message: action.payload };

    default:
      return state;
  }
};
