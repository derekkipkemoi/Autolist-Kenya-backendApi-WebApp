import axios from "axios";
import {
  AUTH_SIGN_UP,
  AUTH_SIGN_IN,
  VERIFY_ACCOUNT,
  REQUEST_PASSWORDRESET,
  RESET_PASSWORD,
  DASHBOARD_GET_RESOURCE,
  CARS_LIST,
  TRENDING_CARS_LIST,
  FEATURED_CARS_LIST,
  CAR_DETAILS,
  POST_CAR,
  POST_IMAGES,
  CAR_DELETE,
  CAR_APPROVE,
  CAR_DECLINE,
  UPDATE_PHONE,
  USER_CARS,
  AUTH_SIGN_OUT,
  AUTH_ERROR,
  CAR_SOLD,
  CAR_EDIT,
  CAR_VIEWED,
  GET_USER,
  UPDATE_PROFILE,
  UPDATE_PROFILE_PICTURE,
  ADD_USER_FAVOURITE,
  GET_USER_FAVOURITE,
} from "./types";

// const baseUrl = process.env.REACT_APP_BASEURL
const baseUrl = process.env.REACT_APP_BASEURL;


export const signUp = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(baseUrl + "/users/registerUser", data);

      console.log("Base url", baseUrl)
      switch (res.data.message) {
        case "User Registered Successfully":
          dispatch({
            type: AUTH_SIGN_UP,
            payload: {
              token: res.data.access_token,
              userObject: res.data.userObject,
              message: res.data.message,
            },
          });
          var testObject = res.data.userObject;
          localStorage.setItem("JWT_TOKEN", res.data.access_token);
          localStorage.setItem("UserObject", JSON.stringify(testObject));
          axios.defaults.headers.common["Authorization"] =
            res.data.access_token;
          break;

        default:
          dispatch({
            type: AUTH_ERROR,
            payload: {
              message: res.data.message,
            },
          });
          break;
      }
    } catch (error) {
      console.error("error", error);
    }
  };
};

export const signIn = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(baseUrl + "/users/loginUser", data);
      switch (res.data.message) {
        case "User Logged In Successfully":
          dispatch({
            type: AUTH_SIGN_IN,
            payload: {
              token: res.data.access_token,
              userObject: res.data.userObject,
              message: res.data.message,
            },
          });
          var userObject = res.data.userObject;
          localStorage.setItem("JWT_TOKEN", res.data.access_token);
          localStorage.setItem("UserObject", JSON.stringify(userObject));
          axios.defaults.headers.common["Authorization"] =
            res.data.access_token;
          break;

        default:
          dispatch({
            type: AUTH_ERROR,
            payload: {
              message: res.data.message,
            },
          });
          break;
      }
    } catch (error) {
      console.error("error", error);
    }
  };
};

export const oauthGoogle = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(baseUrl + "/users/oauth/google", {
        access_token: data,
      });
      switch (res.data.message) {
        case "User Signed In Successfully":
          dispatch({
            type: AUTH_SIGN_UP,
            payload: {
              token: res.data.access_token,
              userObject: res.data.userObject,
              message: res.data.message,
            },
          });
          var userObject = res.data.userObject;
          localStorage.setItem("JWT_TOKEN", res.data.access_token);
          localStorage.setItem("UserObject", JSON.stringify(userObject));
          axios.defaults.headers.common["Authorization"] =
            res.data.access_token;
          break;

        default:
          dispatch({
            type: AUTH_ERROR,
            payload: {
              message: res.data.message,
            },
          });
          break;
      }
    } catch (error) {}
  };
};

export const oauthFacebook = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(baseUrl + "/users/oauth/facebook", {
        access_token: data,
      });
      switch (res.data.message) {
        case "User Signed In Successfully":
          dispatch({
            type: AUTH_SIGN_UP,
            payload: {
              token: res.data.access_token,
              userObject: res.data.userObject,
            },
          });
          var userObject = res.data.userObject;
          localStorage.setItem("JWT_TOKEN", res.data.access_token);
          localStorage.setItem("UserObject", JSON.stringify(userObject));
          axios.defaults.headers.common["Authorization"] =
            res.data.access_token;
          break;

        default:
          dispatch({
            type: AUTH_ERROR,
            payload: {
              message: res.data.message,
            },
          });
          break;
      }
    } catch (error) {}
  };
};

export const getSecret = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(baseUrl + "/users/secret");

      dispatch({
        type: DASHBOARD_GET_RESOURCE,
        payload: res.data.secret,
      });
    } catch (error) {}
  };
};

export const getUser = (userId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(baseUrl + "/users/" + userId);

      dispatch({
        type: GET_USER,
        payload: res.data,
      });
    } catch (error) {}
  };
};

export const verifyUser = (secretToken) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(baseUrl + "/users/verifyUser", {
        secretToken: secretToken,
      });

      dispatch({
        type: VERIFY_ACCOUNT,
        payload: {
          token: res.data.access_token,
          userObject: res.data.userObject,
          message: res.data.message,
        },
      });
      if (res.data.message === "Sorry!! We are unable to verify your account") {
        localStorage.removeItem("JWT_TOKEN");
        localStorage.removeItem("UserObject");
        axios.defaults.headers.common["Authorization"] = "";
      }
      localStorage.setItem("JWT_TOKEN", res.data.access_token);
      localStorage.setItem("UserObject", JSON.stringify(res.data.userObject));
      axios.defaults.headers.common["Authorization"] = res.data.access_token;
    } catch (error) {}
  };
};

export const requestPasswordReset = (email) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        baseUrl + "/users/requestPasswordResetLink",
        {
          email: email,
        }
      );

      dispatch({
        type: REQUEST_PASSWORDRESET,
        payload: res.data.message,
      });
    } catch (error) {}
  };
};

export const resetPassword = (secretToken, userId, password) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        baseUrl + "/users/" + userId + "/resetPassword",
        {
          password: password,
        },
        {
          headers: {
            Authorization: secretToken,
          },
        },
        {}
      );

      dispatch({
        type: RESET_PASSWORD,
        payload: res.data.message,
      });
    } catch (error) {}
  };
};

export const updateUser = (userId, userData) => {
  return async (dispatch) => {
    try {
      const res = await axios.patch(baseUrl + "/users/" + userId, userData);
      dispatch({
        type: UPDATE_PROFILE,
        payload: {
          message: res.data.message,
          userObject: res.data.userObject,
        },
      });
    } catch (error) {}
  };
};

export const getCarsList = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(baseUrl + "/cars/listCars");
      dispatch({
        type: CARS_LIST,
        payload: res.data,
      });
    } catch (error) {}
  };
};

export const getFeaturedCarsList = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(baseUrl + "/cars/listFeaturedCars");
      dispatch({
        type: FEATURED_CARS_LIST,
        payload: res.data,
      });
    } catch (error) {}
  };
};

export const getTrendingCarsList = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(baseUrl + "/cars/listTrendingCars");
      dispatch({
        type: TRENDING_CARS_LIST,
        payload: res.data,
      });
    } catch (error) {}
  };
};

export const getAdminCarsList = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(baseUrl + "/cars/listAdminCars");

      dispatch({
        type: CARS_LIST,
        payload: res.data,
      });
    } catch (error) {}
  };
};

export const postCar = (userId, carData) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        baseUrl + "/users/" + userId + "/cars",
        carData
      );

      dispatch({
        type: POST_CAR,
        payload: {
          message: res.data.message,
          carObject: res.data.carObject,
        },
      });
    } catch (error) {}
  };
};

export const postCarImages = (
  vehicleId,
  imagesData,
  handleUploadProgress = () => {}
) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        baseUrl + "/cars/" + vehicleId + "/carImages",
        imagesData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: handleUploadProgress,
        }
      );
      dispatch({
        type: POST_IMAGES,
        payload: {
          message: res.data.message,
          carObject: res.data.carObject,
        },
      });
    } catch (error) {
      console.error("error", error);
    }
  };
};

export const updateProfileImage = (
  userId,
  imagesData,
  handleUploadProgress = () => {}
) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        baseUrl + "/users/" + userId + "/updateUserImage",
        imagesData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: handleUploadProgress,
        }
      );

      dispatch({
        type: UPDATE_PROFILE_PICTURE,
        payload: {
          message: res.data.message,
          imageUrl: res.data.imageUrl,
        },
      });
    } catch (error) {
      console.error("error", error);
    }
  };
};

export const updatePhoneNumber = (userId, phoneNumber) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        baseUrl + "/users/" + userId + "/phoneNumber",
        phoneNumber
      );

      dispatch({
        type: UPDATE_PHONE,
        payload: {
          userObject: res.data.userObject,
          message: res.data.message,
        },
      });
      localStorage.setItem("UserObject", JSON.stringify(res.data.userObject));
    } catch (error) {
      console.error("error", error);
    }
  };
};

export const getCar = (vehicleId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(baseUrl + "/cars/" + vehicleId);
      dispatch({
        type: CAR_DETAILS,
        payload: {
          carDetails: res.data.carObject,
          carImages: res.data.carObject.images,
          carFeatures: res.data.carObject.features,
          carSeller: res.data.carObject.seller,
        },
      });
    } catch (error) {
      console.error("error", error);
    }
  };
};

export const deleteCar = (vehicleId, handleUploadProgress = () => {}) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(
        baseUrl + "/cars/" + vehicleId + "/deleteCar",
        {
          onUploadProgress: handleUploadProgress,
        }
      );
      dispatch({
        type: CAR_DELETE,
        payload: res.data.message,
      });
    } catch (error) {
      console.error("error", error);
    }
  };
};

export const approveCar = (vehicleId, handleUploadProgress = () => {}) => {
  return async (dispatch) => {
    try {
      const res = await axios.patch(
        baseUrl + "/cars/" + vehicleId + "/approveCar",
        {
          onUploadProgress: handleUploadProgress,
        }
      );
      dispatch({
        type: CAR_APPROVE,
        payload: res.data.message,
      });
    } catch (error) {
      console.error("error", error);
    }
  };
};

export const declineCar = (vehicleId, handleUploadProgress = () => {}) => {
  return async (dispatch) => {
    try {
      const res = await axios.patch(
        baseUrl + "/cars/" + vehicleId + "/declineCar",
        {
          onUploadProgress: handleUploadProgress,
        }
      );
      dispatch({
        type: CAR_DECLINE,
        payload: res.data.message,
      });
    } catch (error) {
      console.error("error", error);
    }
  };
};

export const carSold = (vehicleId) => {
  return async (dispatch) => {
    try {
      const res = await axios.patch(
        baseUrl + "/cars/" + vehicleId + "/carSold"
      );

      dispatch({
        type: CAR_SOLD,
        payload: res.data.message,
      });
    } catch (error) {
      console.error("error", error);
    }
  };
};

export const carViewed = (vehicleId) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        baseUrl + "/cars/" + vehicleId + "/carViewed"
      );
      dispatch({
        type: CAR_VIEWED,
        payload: res.data.message,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const carEdit = (
  vehicleId,
  carEditData,
  handleUploadProgress = () => {}
) => {
  return async (dispatch) => {
    try {
      const res = await axios.patch(
        baseUrl + "/cars/" + vehicleId,
        carEditData,
        {
          onUploadProgress: handleUploadProgress,
        }
      );
      dispatch({
        type: CAR_EDIT,
        payload: res.data.message,
      });
    } catch (error) {
      console.error("error", error);
    }
  };
};

export const getUserCars = (userId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(baseUrl + "/users/" + userId + "/cars");
      dispatch({
        type: USER_CARS,
        payload: res.data,
      });
    } catch (error) {
      console.error("error", error);
    }
  };
};

export const getUserFavouriteList = (userId, vehicleId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        baseUrl + "/users/" + userId + "/" + vehicleId + "/favouriteCarsList"
      );
      dispatch({
        type: GET_USER_FAVOURITE,
        payload: res.data,
      });
    } catch (error) {
      console.error("error", error);
    }
  };
};

export const addCarToFavouriteList = (userId, vehicleId) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        baseUrl + "/users/" + userId + "/" + vehicleId + "/favouriteCarsList"
      );
      dispatch({
        type: ADD_USER_FAVOURITE,
        payload: res.data.message,
      });
      localStorage.setItem("UserObject", JSON.stringify(res.data.userObject));
    } catch (error) {
      console.error("error", error);
    }
  };
};

export const signOut = () => {
  return (dispatch) => {
    localStorage.removeItem("JWT_TOKEN");
    localStorage.removeItem("UserObject");
    axios.defaults.headers.common["Authorization"] = "";

    dispatch({
      type: AUTH_SIGN_OUT,
      payload: {
        token: "",
        userObject: {},
      },
    });
  };
};
