const passport = require("passport");
const Jwtstrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const GoogleTokenStrategy = require("passport-google-token").Strategy;
const FacebookTokenStrategy = require("passport-facebook-token");
const User = require("./models/user");

require("dotenv").config();

const { token } = require("morgan");
const badCredentials = "Incorrect User Password or Email";

// JSON WEB TOKENS Strategy

passport.use("jwt",new Jwtstrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        //find the users specified in token
        const user = await User.findById(payload.sub);
        //If user does not exist, handle it

        if (!user) {
          const message = "Your token is invalid";
          return done(null, message);
        }
        done(null, user);
      } catch (error) {
        const message = "Your token is invalid";
        done(null, message);
      }
    }
  )
);

passport.use(
  "jwtPasswordReset",
  new Jwtstrategy({
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        //find the users specified in token
        const user = await User.findById(payload.sub);
        //If user does not exist, handle it
        if (user.local.passwordResetToken === undefined) {
          return done(null, false);
        }
        done(null, user);
      } catch (error) {
        const message = error;
        done(null, message);
      }
    }
  )
);

//Facebook Oauth strategy
passport.use(
  "facebookToken",
  new FacebookTokenStrategy(
    {
      clientID: process.env.FACEBOOKCLIENTID,
      clientSecret: process.env.FACEBOOKCLIENTSECRET,
    },
    async (accessToken, refereshToken, profile, done) => {
      try {
        console.log(profile);
        const existingUser = await User.findOne({ "facebook.id": profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = new User({
          method: "facebook",
          facebook: {
            name: profile.displayName,
            picture: profile.photos[0].value,
            email: profile.emails[0].value,
            id: profile.id,
          },
          phoneNumber: {
            number: 0,
            verified: false,
          },
        });
        console.log(profile.photos[0].value)
        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);

// Google Oauth Strategy
passport.use(
  "googleToken",
  new GoogleTokenStrategy(
    {
      clientID: process.env.GOOGLECLIENTID,
      clientSecret: process.env.GOOGLECLIENTSECRET,
    },
    async (accessToken, refereshToken, profile, done) => {
      try {
        //Check if current user exist in DB
        console.log(profile);
        const existingUser = await User.findOne({ "google.id": profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }

        //if new account
        const newUser = new User({
          method: "google",
          google: {
            name: profile.displayName,
            picture: profile._json.picture,
            email: profile.emails[0].value,
            id: profile.id,
          },
          phoneNumber: {
            number: 0,
            verified: false,
          },
        });

        console.log("User Raw Data ", profile._json.picture)

        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);

passport.use(
  "facebookTokenAdmin",
  new FacebookTokenStrategy(
    {
      clientID: process.env.FACEBOOKCLIENTID,
      clientSecret: process.env.FACEBOOKCLIENTSECRET,
    },
    async (accessToken, refereshToken, profile, done) => {
      try {
        console.log(profile);
        const existingUser = await User.findOne({
          "facebook.id": profile.id,
        });
        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = new User({
          method: "facebook",
          role: "admin",
          facebook: {
            name: profile.displayName,
            picture: profile.photos[0].value,
            email: profile.emails[0].value,
            id: profile.id,
          },
          phoneNumber: {
            number: 0,
            verified: false,
          },
        });

        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);

// GoogleAdmin Oauth Strategy
passport.use(
  "googleTokenAdmin",
  new GoogleTokenStrategy(
    {
      clientID: process.env.GOOGLECLIENTID,
      clientSecret: process.env.GOOGLECLIENTSECRET,
    },
    async (accessToken, refereshToken, profile, done) => {
      try {
        //Check if current user exist in DB
        console.log(profile);
        const existingUser = await User.findOne({
          "google.id": profile.id,
        });
        if (existingUser) {
          return done(null, existingUser);
        }

        //if new account
        const newUser = new User({
          method: "google",
          role: "admin",
          google: {
            name: profile.displayName,
            email: profile.emails[0].value,
            id: profile.id,
          },
          phoneNumber: {
            number: 0,
            verified: false,
          },
        });

        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);

// Local Strategy
passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      //find User given email
      try {
        const user = await User.findOne({ "local.email": email });
        // if not handle it
        if (!user) {
          const message = "User Does Not Exist";
          return done(null, message);
        }

        //check if password is correct
        const isMatch = await user.isValidPassword(password);

        // if not handle it
        if (!isMatch) {
          const message = "User Does Not Exist";
          return done(null, message);
        }

        //Otherwise, return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
