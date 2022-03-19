const express = require("express");
//const router = express.Router();
const router = require("express-promise-router")();

const passport = require("passport");

const passportConfig = require("../passport");
const UsersController = require("../controllers/users");
const {
  validateParam,
  validateBody,
  schemas,
} = require("../helpers/routeHelpers");
const { Schema } = require("mongoose");
const passportLocal = passport.authenticate("local", { session: false });
const passportJwt = passport.authenticate("jwt", {
  session: false,
});
const passportResetPasswordJwt = passport.authenticate("jwtPasswordReset", {
  session: false,
});
const passportGoogle = passport.authenticate("googleToken", { session: false });
const passportFacebook = passport.authenticate("facebookToken", {
  session: false,
});
const passportGoogleAdmin = passport.authenticate("googleTokenAdmin", {
  session: false,
});
const passportFacebookAdmin = passport.authenticate("facebookTokenAdmin", {
  session: false,
});

// Token Authorization
router.route("/secret").get(passportJwt, UsersController.secret);

// List Users
router.route("/listUsers").get(UsersController.index);

// register new user
router
  .route("/registerUser")
  .post(validateBody(schemas.userSchema), UsersController.newUser);

// User Login
router
  .route("/loginUser")
  .post(
    validateBody(schemas.userLogInSchema),
    passportLocal,
    UsersController.logInUser
  );

  //Verify User
router
  .route("/verifyUser")
  .post(
    validateBody(schemas.verifyUserSchema),
    UsersController.verifyUser
  );

  //updateuser profile picture
  router.route("/:userId/updateUserImage").post(validateParam(schemas.idSchema,"userId"),
  UsersController.updateUserImage)

  //request password reset link
router
  .route("/requestPasswordResetLink")
  .post(
    validateBody(schemas.userRequestPasswordResetLink),
    UsersController.requestPasswordResetLink
  );


  //reset password
router
  .route("/:userId/resetPassword")
  .post(
    [
      validateParam(schemas.idSchema, "userId"),
      validateBody(schemas.resetPassword)
    ],
    passportResetPasswordJwt,
    UsersController.resetUserPassword
  );

  //update user phone number
router.route("/:userId/phoneNumber").post(
  [
    validateParam(schemas.idSchema, "userId"),
    validateBody(schemas.userPhoneNumberSchema),
  ],
  UsersController.updateUserPhone
);

// Register Admin With Facebook
router
  .route("/oauth/registerAdminUserFacebook")
  .post(passportFacebookAdmin, UsersController.facebookOAuthAdmin);

// Register Admin With Google
router
  .route("/oauth/registerAdminUserGoogle")
  .post(passportGoogleAdmin, UsersController.googleOAuthAdmin);

  //Google oauth
router.route("/oauth/google").post(passportGoogle, UsersController.googleOAuth);

//facebook oauth
router
  .route("/oauth/facebook")
  .post(passportFacebook, UsersController.facebookOAuth);

  
  //Mpesa payments
router.route("/mpesa").post(UsersController.mpesa);


// /users/:id
router
  .route("/:userId")
  .get(validateParam(schemas.idSchema, "userId"), UsersController.getUser)
  .put(
    [
      validateParam(schemas.idSchema, "userId"),
      validateBody(schemas.userSchema),
    ],
    UsersController.replaceUser
  )
  .patch(
    [
      validateParam(schemas.idSchema, "userId"),
      validateBody(schemas.userOptionalSchema),
    ],
    UsersController.updateUser
  );

// /:userId/cars
router
  .route("/:userId/cars")
  .get(validateParam(schemas.idSchema, "userId"), UsersController.getUserCars)
  .get(validateParam(schemas.idSchema, "userId"), UsersController.viewUserCars)
  .post([validateParam(schemas.idSchema, "userId"),validateBody(schemas.userCarSchema),], UsersController.newUserCar);


  // /:userId/cars
router
.route("/:userId/viewUserCars")
.get(validateParam(schemas.idSchema, "userId"), UsersController.viewUserCars)


  // /:userId/cars
router
.route("/:userId/:carId/favouriteCarsList")
.get(validateParam(schemas.idSchema, "userId"), UsersController.getUserfavouriteCars)
.post(
  [
    validateParam(schemas.idSchema, "userId"),
    validateParam(schemas.idSchema, "carId"),
  ],
  UsersController.addToFavouriteLists
);



//contact us
router
.route("/:userId/contactUs")
.post(
  [
    validateParam(schemas.idSchema, "userId"),
    validateBody(schemas.contactUsSchema)
  ],
  UsersController.contactUs
);

//save user Firebase messaging token
router
.route("/:userId/userFcmToken")
.post(
  [
    validateParam(schemas.idSchema, "userId"),
    validateBody(schemas.verifyUserSchema)
  ],
  UsersController.saveUserFcmToken
);

router
.route("/sendNotificationToUsers")
.post(validateBody(schemas.usersMessagingSchema),UsersController.sendNotificationToUsers);


module.exports = router;
