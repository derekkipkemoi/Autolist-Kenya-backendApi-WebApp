const express = require('express')
const logger = require('morgan')
var { Promise } = require('mongoose')
const { json, urlencoded } = require('body-parser')
const helmet = require('helmet')
const { join } = require('path')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const pug = require('pug')
const connectToDB = require("./database/db.js")


const { config } = require ('dotenv')
const dotenvExpand = require('dotenv-expand')
var myEnv = config({path: ".env"})
dotenvExpand(myEnv)

console.log("server logging envirnment",myEnv);


Promise = global.Promise;
connectToDB();


const app = express();

app.set('views', join(__dirname, './views'));
app.set('view engine', 'pug')
app.use(cors())
app.use(helmet())
app.enable('trust proxy');

//File Upload
app.use(fileUpload({
    createParentPath: true
}));
app.use('/uploads',express.static('uploads'))

//Routes
const users = require('./routes/users')
const cars = require('./routes/cars')
const payments = require('./routes/payments')
//Middleware
app.use(logger('dev'));
app.use(json({limit: "50mb"}));
app.use(urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

//Routes
app.use('/users', users)
app.use('/cars', cars)
app.use('/payments', payments)

//Catch 404 Errors and forward them to error handler
app.use((req,res,next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//Error Handler Function
app.use((err,req,res,next) => {
    const error = app.get('env')  === 'development' ? err : {};
    const status = err.status || 500;
    //respond to client
    res.status(status).json({
        error: {
            message: error.message
        }
    });
    //Respond to ourselves
    console.error(error)  
})

//Start the server
const port = process.env.PORT || 5000;
app.listen(port,() => console.log(`Server is running in at port ${port}`));
