import {
  AUTH_SIGN_UP,
  AUTH_SIGN_IN,
  VERIFY_ACCOUNT,
  REQUEST_PASSWORDRESET,
  RESET_PASSWORD,
  AUTH_SIGN_OUT,
  AUTH_ERROR,
  UPDATE_PHONE,
  GET_USER,
  UPDATE_PROFILE,
  UPDATE_PROFILE_PICTURE
} from "../actions/types";

const DEFAULT_STATE = {
  isAuthenticated: false,
  token: "",
  userObject: {},
  imageUrl: "",
  message: "",
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case AUTH_SIGN_UP:
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        userObject: action.payload.userObject,
        message: action.payload.message,
      };

    case VERIFY_ACCOUNT:
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        userObject: action.payload.userObject,
        message: action.payload.message,
      };

    case AUTH_SIGN_OUT:
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: false,
        userObject: action.payload.userObject,
      };

    case AUTH_SIGN_IN:
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        userObject: action.payload.userObject,
        message: action.payload.message,
      };

    case GET_USER:
      return {
        ...state,
        userObject: action.payload,
      };

    case UPDATE_PROFILE:
      return {
        ...state,
        message: action.payload.message,
        userObject: action.payload.userObject,
      };

      case UPDATE_PROFILE_PICTURE:
      return {
        ...state,
        message: action.payload.message,
        imageUrl: action.payload.imageUrl,
      };

    case UPDATE_PHONE:
      return {
        ...state,
        userObject: action.payload.userObject,
        message: action.payload.message,
      };

    case REQUEST_PASSWORDRESET:
      return {
        ...state,
        message: action.payload,
      };

    case RESET_PASSWORD:
      return {
        ...state,
        message: action.payload,
      };

    case AUTH_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        message: action.payload.message,
      };

    default:
      return state;
  }
};
