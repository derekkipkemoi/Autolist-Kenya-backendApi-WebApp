const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    paymentMessage: String,
    payer: {
        type: Schema.Types.ObjectId,
            ref: 'user'
    },
    carName:{
            type: String
        },
    paymentPackage: {
        packageName: {
            type: String
        },
        packagePrice: {
            type: Number
        }
    }
},{ timestamps: true })

const Payment = mongoose.model('payment',paymentSchema)
module.exports = Payment