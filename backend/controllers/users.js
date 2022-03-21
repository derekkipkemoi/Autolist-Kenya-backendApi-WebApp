const JWT = require("jsonwebtoken");
const User = require("../models/user");
const Car = require("../models/car");
const _ = require("lodash");
const { method } = require("lodash");
const pug = require("pug");
const path = require("path");
const admin = require("firebase-admin")

var serviceAccount = require("../configuration/autolist-firebase.json");
const randomstring = require("randomstring");
const mailer = require("../misc/mailer");
const Mpesa = require("mpesa-node");
const { findOne, findById } = require("../models/user");
const { match } = require("assert");

require("dotenv").config();


const mpesaApi = new Mpesa({
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
  environment: process.env.MPESA_ENVIRONMENT,
  ShortCode: process.env.LIPANAMPESASHORTCODE,
  initiatorName: "Test Initiator",
  lipaNaMpesaShortCode: process.env.LIPANAMPESASHORTCODE,
  lipaNaMpesaShortPass:
    process.env.LIPANAMPESASHORTPASS,
  securityCredential:
  process.env.SECURITYCREDENTIAL,
  certPath: process.env.CERTPATH,
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const generaltopic = 'General';

signToken = (user) => {
  return JWT.sign(
    {
      iss: "carlistingsapi",
      sub: user.id,
      iat: new Date().getTime(), //current time
      exp: new Date().setDate(new Date().getDate() + 5), //current time
    },
    process.env.JWT_SECRET
  );
};


signTokenPasswordReset = (user) => {
  return JWT.sign(
    {
      iss: "carlistingsapi",
      sub: user.id,
      iat: new Date().getTime(), //current time
      exp: new Date().setDate(new Date().getDate() + 5), //current time
    },
    process.env.JWT_SECRET
  );
};

module.exports = {
  secret: async (req, res, next) => {
    res.json({ secret: "Validation Sucess" });
  },

  mpesa: async (req, res, next) => {
    const response = req.body.Body.stkCallback.ResultDesc;
    res.status(200).json({ response });
  },

  //Validation: Done
  index: async (req, res, next) => {
    const users = await User.find().select(
      "id method cars local.name local.picture local.email google.email google.name facebook.email facebook.name"
    );
    res.status(200).json(users);
  },

  resetUserPassword: async (req, res, next) => {
    const { userId } = req.params;
    console.log(userId);
    res.status(200).json(userId);
  },

  //Validation: Done
  newUser: async (req, res, next) => {
    const foundUser = await User.findOne({ "local.email": req.value.body.email });
    if (foundUser) {
      const message = {
        message: "User with " + req.value.body.email + " already exists!",
      };
      return res.status(200).json(message);
    }

    //generate random token
    const secretString = randomstring.generate();
    // Insert the new user if they do not exist yet

    const user = new User({
      method: "local",
      role: "user",
      local: {
        name: req.value.body.name,
        picture: "",
        email: req.value.body.email,
        password: req.value.body.password,
        secretToken: secretString,
        active: false,
      },
      phoneNumber: {
        number: 0,
        verified: false,
      },
    });

    
   if(JSON.stringify(process.env.NODE_ENV) === JSON.stringify("production")){
    const html = pug.renderFile(path.join(__dirname, "../views", "register.pug"), {
      secretToken: secretString,
    });

    await mailer.sendEmail(
      "welcome@autolist.co.ke",
      req.body.email,
      "Autolist Account Verification ✔",
      html
    );
   }
    
    //console.log(mail);
    await user.save();
    const userObject = _.pick(user, [
      "id",
      "method",
      "role",
      "cars",
      "favouriteCars",
      "local.name",
      "local.picture",
      "local.email",
      "phoneNumber",
      "local.active",
      "local.secretToken",
    ]);
    const access_token = signToken(user);
    const message = "User Registered Successfully";
    res.status(200).json({ message,access_token,userObject});
  },

  //Validation: Done
  newAdminUser: async (req, res, next) => {
    const foundUser = await User.findOne({
      "local.email": req.body.email,
    });
    if (foundUser) {
      const message = {
        message: "User with " + req.body.email + " already exists!",
      };
      return res.status(200).json(message);
    }
    // Insert the new user if they do not exist yet
    const user = new User({
      method: "local",
      role: "admin",
      local: {
        name: req.body.name,
        picture: "",
        email: req.body.email,
        password: req.body.password,
      },
      phoneNumber: {
        number: 0,
        verified: false,
      },
    });
    //const salt = await bcrypt.genSalt(10);
    //user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const userObject = _.pick(user, [
      "id",
      "method",
      "role",
      "cars",
      "favouriteCars",
      "local.name",
      "local.picture",
      "local.email",
      "phoneNumber",
      "local.active",
      "local.secretToken",
    ]);
    const access_token = signToken(user);
    const message = "User Registered Successfully";
    res.status(200).json({
      message,
      access_token,
      userObject,
    });
  },

  //Login user
  logInUser: async (req, res, next) => {
    if (req.user === "User Does Not Exist") {
      const message = "Incorrect User Email Or Password";
      res.status(200).json({ message });
    }
    //Generate Token
    const userObject = _.pick(req.user, [
      "id",
      "method",
      "role",
      "cars",
      "favouriteCars",
      "local.name",
      "local.picture",
      "local.email",
      "phoneNumber",
      "local.active",
      "local.secretToken",
    ]);
    //const userObject = (req.user)
    const access_token = signToken(userObject);
    const message = "User Logged In Successfully";
    res.status(200).json({ message, access_token, userObject});
  },

  //Verify user
  verifyUser: async (req, res, next) => {
    const { secretToken } = req.value.body;
    const user = await User.findOne({
      "local.secretToken": secretToken,
    });
    if (user === undefined) {
      const message = "Sorry!! We are unable to verify your account";
      return res.status(200).json({ message });
    }
    //Generate Token
    user.local.active = true;
    user.local.secretToken = undefined;
    await user.save();
    const userObject = _.pick(user, [
      "id",
      "method",
      "role",
      "cars",
      "favouriteCars",
      "local.name",
      "local.picture",
      "local.email",
      "phoneNumber",
      "local.active"
    ]);
    //const userObject = (req.user)
    const access_token = signToken(userObject);
    const message =
      "Congratulations!! Your Account has been activated successfully";
    res.status(200).json({ message, access_token, userObject });
  },

  //reset user password
  requestPasswordResetLink: async (req, res, next) => {
    const {email} = req.value.body
    const user = await User.findOne({ "local.email": email });
    if (!user) {
      const message =
        "User With this email does not exist. Please Use the Email you Registered with";
      return res.status(200).json({ message });
    }

    // renderFile
    const passwordResetToken = signTokenPasswordReset(user);
    

    // 
    if(process.env.NODE_ENV === "production"){

      const html = pug.renderFile(
        path.join(__dirname, "../views", "resetpassword.pug"),
        {
          secretToken: passwordResetToken,
          userId: user.id,
        }
      );

      await mailer.sendEmail(
        "passwordreset@autolist.co.ke",
        email,
        "Autolist Password Reset",
        html
      );

    }
    user.local.passwordResetToken = passwordResetToken;
 
    await user.save();
    const message =
      "Password reset link has been sent to "+email+" please use it to reset your password";
    res.status(200).json({ message });
  },

  //Update User Password After sending Reset Link
  resetUserPassword: async (req, res, next) => {
    const user = req.user;
    const { password } = req.value.body;
    const isMatch = await user.isValidPassword(password);
    if (isMatch) {
      const message = "Please use a password you have not used before";
      return res.status(200).json({ message });
    }
    user.local.password = password;
    user.local.passwordResetToken = undefined;
    await user.save();
    const message =
      "Your Password Has Been Reset Successfully, Please LogIn with your new password";
    res.status(200).json({ message });
  },

  googleOAuth: async (req, res, next) => {
    //Generate token
    const userObject = _.pick(req.user, [
      "id",
      "method",
      "cars",
      "favouriteCars",
      "google.name",
      "google.picture",
      "google.email",
      "phoneNumber",
    ]);
    const access_token = signToken(req.user);
    const message = "User Signed In Successfully";
    res.status(200).json({ message, access_token, userObject });
  },

  facebookOAuth: async (req, res, next) => {
    //Generate token
    const userObject = _.pick(req.user, [
      "id",
      "method",
      "cars",
      "favouriteCars",
      "facebook.name",
      "facebook.picture",
      "facebook.email",
      "phoneNumber",
    ]);
    const access_token = signToken(req.user);
    const message = "User Signed In Successfully";
    res.status(200).json({ message, access_token, userObject });
  },

  googleOAuthAdmin: async (req, res, next) => {
    //Generate token
    const userObject = _.pick(req.user, [
      "id",
      "method",
      "role",
      "cars",
      "favouriteCars",
      "google.name",
      "google.picture",
      "google.email",
      "phoneNumber",
    ]);
    const access_token = signToken(req.user);
    const message = "User Signed In Successfully";
    res.status(200).json({
      message,
      access_token,
      userObject,
    });
  },

  facebookOAuthAdmin: async (req, res, next) => {
    //Generate token
    const userObject = _.pick(req.user, [
      "id",
      "method",
      "role",
      "cars",
      "favouriteCars",
      "facebook.name",
      "facebook.picture",
      "facebook.email",
      "phoneNumber",
    ]);
    const access_token = signToken(req.user);
    const message = "User Signed In Successfully";
    res.status(200).json({
      message,
      access_token,
      userObject,
    });
  },

  updateUserPhone: async (req, res, next) => {
    const { userId } = req.value.params;
    const user = await User.findById(userId);
    if (!user) {
      const message = "User Does Not Exist";
      return res.status(200).json({ message });
    }

    const {number} = req.value.body
    user.phoneNumber.number = number;
    user.phoneNumber.verified = true;
    await user.save();
    const message = "User Phone Number Updated Successfully";
    let userObject;
    if (user.method === "local") {
      userObject = _.pick(user, [
        "id",
        "method",
        "role",
        "cars",
        "favouriteCars",
        "local.name",
        "local.picture",
        "local.email",
        "phoneNumber",
        "local.active",
      ]);
    }

    if (user.method === "facebook") {
      userObject = _.pick(user, [
        "id",
        "method",
        "role",
        "cars",
        "favouriteCars",
        "facebook.name",
        "facebook.picture",
        "facebook.email",
        "phoneNumber",
      ]);
    }

    if (user.method === "google") {
      userObject = _.pick(user, [
        "id",
        "method",
        "role",
        "cars",
        "favouriteCars",
        "google.name",
        "google.picture",
        "google.email",
        "phoneNumber",
      ]);
    }
    res.status(200).json({ message, userObject });
  },

  //Validation: Done
  getUser: async (req, res, next) => {
    const { userId } = req.value.params;
    const user = await User.findById(userId);
    res.status(200).json(user);
  },

  saveUserFcmToken: async (req, res, next) => {
    const { userId } = req.value.params;
  
    const userObject = await User.findById(userId);
    if(!userObject){
      message = "User not found";
      return res.status(200).json({ message });
    }

    const {secretToken} = req.value.body
    
    userObject.userFcmToken = secretToken
    await userObject.save()
    message = "User Messaging token saved successfully";
    res.status(200).json({ message });
  },
  
  updateUserImage: async (req, res, next) => {
    var imageUrl
    if (!req.files) {
      res.send({ status: false, message: "No file uploaded" });
    } else {
      const { userId } = req.value.params;
      var userObject = await User.findById(userId);

      const url = process.env.FILES_URI;;
      //loop all files
      if (req.files.photos instanceof Array) {
        _.forEach(_.keysIn(req.files.photos), (key) => {
          const photo = req.files.photos[key];
          const currentPhoto = Date.now() + photo.name.replace(/\s/g, '')
          photo.mv("./uploads/" + currentPhoto);
          imageUrl = url + "/uploads/" + currentPhoto;
        });
      } else {
        const photo = req.files[Object.keys(req.files)[0]];
        const currentPhoto = Date.now() + photo.name;
        photo.mv("./uploads/" + currentPhoto);
        imageUrl = url + "/uploads/" + currentPhoto;
        
      }

      if(userObject.method == "facebook"){
        await User.updateOne({ _id: userId }, { "facebook.picture": imageUrl});
        // userObject = await User.findById(userId);
        const message = "Profile Image uploaded successfuly"
        res.status(200).json({ imageUrl, message });
      }

      if(userObject.method == "google"){
        await User.updateOne({ _id: userId }, { "google.picture": imageUrl});
        // userObject = await User.findById(userId);
        const message = "Profile Image uploaded successfuly"
        res.status(200).json({ imageUrl, message });
      }

      if(userObject.method == "local"){
        await User.updateOne({ _id: userId }, { "local.picture": imageUrl});
        // userObject = await User.findById(userId);
        const message = "Profile Image uploaded successfuly"
        res.status(200).json({ imageUrl, message });
      }

    }
  },

  //Validation: Done
  replaceUser: async (req, res, next) => {
    //enforce that req.body must contain all the fields
    const { userId } = req.value.params;
    const newUser = req.value.body;
    const result = await User.findByIdAndUpdate(userId, newUser);
    res.status(200).json({ success: true });
  },

  //Validation: Done
  updateUser: async (req, res, next) => {
    const { userId } = req.value.params;
    const {name} = req.value.body;
    var userObject = await User.findById(userId)
    if(userObject.method === "local"){
     await User.updateOne({ _id: userId }, { "local.name": name });
     userObject = await User.findById(userId)
    }

    if(userObject.method === "facebook"){
      await User.findOneAndUpdate({ _id: userId }, { "facebook.name": name });
      userObject = await User.findById(userId)
    }

    if(userObject.method === "google"){
      await User.findOneAndUpdate({ _id: userId }, { "google.name": name });
      userObject = await User.findById(userId)
    }

    
    
    //const user = await User.findById(userId);
    const message = "User Name Updated Successfully";
    res.status(200).json({ message, userObject });
  },

  //Validation: Done
  getUserCars: async (req, res, next) => {
    const { userId } = req.value.params;
    const user = await User.findById(userId).populate({path: 'cars'})
    res.status(200).json(user.cars);
  },


  //Validation: Done
  viewUserCars: async (req, res, next) => {
    const { userId } = req.value.params;
    const user = await User.findById(userId).populate({path: 'cars',match: { status: 'active' }})
    res.status(200).json(user.cars);
  },
  
  //Validation: Done
  newUserCar: async (req, res, next) => {
    const { userId } = req.value.params;
    //Create a new Car
    const carObject = new Car(req.value.body);
    //Get User
    const user = await User.findById(userId);
    //Assign user as a car seller
    carObject.seller.sellerID = user.id;
    carObject.seller.sellerNumber = user.phoneNumber.number;
    carObject.seller. sellerAvailableSince = user.createdAt;
    switch (user.method) {
      case "facebook":
        carObject.seller.sellerEmail = user.facebook.email;
        carObject.seller.sellerName = user.facebook.name;
        carObject.seller.sellerPhoto = user.facebook.picture;
        break;
      case "google":
        carObject.seller.sellerEmail = user.google.email;
        carObject.seller.sellerName = user.google.name;
        carObject.seller.sellerPhoto = user.google.picture;
        break;
      default:
        carObject.seller.sellerEmail = user.local.email;
        carObject.seller.sellerName = user.local.name;
        carObject.seller.sellerPhoto = user.local.picture;
    }
    //Save the Car
    await carObject.save();
    //Add car to the seller array cars
    user.cars.push(carObject);
    //Save the user
    await user.save();
    const message = "Uploaded Successfuly";
    res.status(200).json({ carObject, message });
  },

    //Validation: Done
    addToFavouriteLists: async (req, res, next) => {
      const { userId, carId } = req.value.params;
      //Create a new Car
      //Get User
      const userObject = await User.findById(userId);
      
      if(!userObject){
        message = "User not found";
       return res.status(200).json({ message });
      }

      const carObject = await Car.findById(carId)
      if(!carObject){
        message = "Car not found";
        return res.status(200).json({ message });
      }
      
      const carExist = userObject.favouriteCars.includes(carId);
      if(carExist){
        //Remove car from the favourite list
        userObject.favouriteCars.pull(carObject.id);
        await userObject.save();
       
        message = "Car removed from favourite list successfuly";
        return res.status(200).json({ userObject , message });
      }

      //Add car to the favourite list
      userObject.favouriteCars.push(carObject.id);
      await userObject.save();
      
      message = "Car added to favourite list successfuly";
      res.status(200).json({userObject, message });
    },

    //Validation: Done
  getUserfavouriteCars: async (req, res, next) => {
    const { userId } = req.value.params;
    const user = await User.findById(userId).populate({path: 'favouriteCars',match: { status: 'active' }});
    res.status(200).json(user.favouriteCars);
  },

  //contact us
  contactUs: async (req, res, next) => {
    const { userId } = req.value.params;
    
    var name
    var phoneNumber = 0
    //Get User
    const user = await User.findById(userId);
    message = "User does not exist"

    if(!user){
      return res.status(200).json({ message });
    }


    const {email, subject, userMessage} = req.value.body
    
    switch (user.method) {
      case "facebook":
        name = user.facebook.name;
        break;
      case "google":
        name = user.google.name;
        break;
      default:
        name = user.local.name;
    }

    if(user.phoneNumber.verified){
      phoneNumber = user.phoneNumber.number
    }


    // renderFile
    const html = pug.renderFile(
      path.join(__dirname, "../views", "contactus.pug"),
      {
        useremail: email,
        userid: user.id,
        username : name,
        usersubject : subject,
        phonenumber : phoneNumber,
        usermessage: userMessage
      }
    );

    // 
    await mailer.sendEmail(
      email,
      "derekkipkemoi@gmail.com",
      "Autolist. User Contact.",
      html
    );
    message = "Your message has been received successfully by info@autolist.co.ke. We will respond to your in shorwhile. Keep Checking your email " + email;
    res.status(200).json({ message });
  },


  sendNotificationToUsers : async(req, res, next) =>{
    const {userId} = req.value.params
    const userObject = await User.findById(userId)

    if(!userObject){
      var message = "Use does not exist"
      return res.status(200).json({message})
    }

    const {topic,title,body} = req.value.body
    message = {
        notification: {
          title: title,
          body: body
        },
        topic: topic
      };
    
    admin.messaging().send(message)
      .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
    });

    message = "Message sent successfuly"
    res.status(200).json({ message });
  },
    


    //Send a message to devices subscribed to the provided topic.

  subscribeUsersToTop : async(req, res, next) =>{
    var registrationTokens = [
      'eFX7rB1dRD2bzV7BGP4EeX:APA91bHXGZrVFXWJU_8a6W1mUDj3P9Ntb1-Z8N2RIYKeIgd8CBaTgmPHui-G2vf9y1NOau144enu3jkRsLKob1fotFC1Bc5YeYAlbFZ8Bq4kB7Dq0PDtybueNhK5AtHlRjwDjgWiwwGT'
    ];
    
    admin.messaging().subscribeToTopic(registrationTokens, topic)
      .then(function(response) {
        console.log('Successfully subscribed to topic:', response);
      })
      .catch(function(error) {
        console.log('Error subscribing to topic:', error);
      });   
    },
  

};
