const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { string } = require("joi");

mongoose.set('toJSON', {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
  }
});

const userSchema = new Schema({
  method: {
    type: String,
    enum: ["local", "google", "facebook"],
    required: true,
  },

  cars: [
    {
      type: Schema.Types.ObjectId,
      ref: "car",
    },
  ],

  favouriteCars: [
    {
      type: Schema.Types.ObjectId,
      ref: "car",
    },
  ],

  payments: [
    {
      type: Schema.Types.ObjectId,
      ref: "payment"
    }
  ],

  userFcmToken: String,

  local: {
    name: String,
    picture: String,
    email: {
      type: String,
      lowercase: true,
    },
    password: String,
    secretToken: String,
    active: Boolean,
    passwordResetToken: String,
  },

  google: {
    id: String,
    name: String,
    picture: String,
    email: {
      type: String,
      lowercase: true,
    },
  },

  facebook: {
    id: String,
    name: String,
    picture: String,
    email: {
      type: String,
      lowercase: true,
    },
  },

  phoneNumber: {
    number: Number,
    verified: Boolean,
  },

  role: {
    type: String,
    default: "user",
    enum: ["user", "admin", "superadmin"],
  },
},{timestamps : true});

userSchema.pre("save", async function (next) {
  try {
    var obj = this
    if (this.method !== "local") {
      next();
    }

    if (this.isModified("local.password")) {
      // check if password is modified then hash it
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(this.local.password, salt);
      this.local.password = passwordHash;
      next();
    }
    //Generate a salt
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model("user", userSchema);
module.exports = User;
