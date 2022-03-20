const mongoose = require("mongoose");

const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
var myEnv = dotenv.config({path: "../.env"})
dotenvExpand(myEnv)

const connectToDB = async () => {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
        dbName: process.env.DB_NAME,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    console.log(`MongoDB connected: ${connect.connection.host}`);
};

module.exports = connectToDB;