import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./auth";
import dashBoardReducer from "./dashboard";
import carsListReducer from "./carsList";
import userCarsListReducer from "./userCarsList";
import carDetailsReducer from "./carDetails";
import carActions from "./carActions";
import postCar from "./postCar";

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  carActions: carActions,
  dashboard: dashBoardReducer,
  carsList: carsListReducer,
  userCarsList: userCarsListReducer,
  carDetails: carDetailsReducer,
  postCar: postCar,
});
