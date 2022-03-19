import { DASHBOARD_GET_RESOURCE } from "../actions/types";

const DEFAULT_STATE = {
  secret: "",
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case DASHBOARD_GET_RESOURCE:
      return { ...state, secret: action.payload };

    default:
      return state;
  }
};
