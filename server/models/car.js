const { date } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// for removing _id (underscore) in schema
mongoose.set('toJSON', {
    virtuals: true,
    transform: (doc, converted) => {
      delete converted._id;
    }
  })


const carSchema = new Schema({
    name: String,
    make: String,
    model: String,
    year: Number,
    body: String,
    condition: String,
    transmission: String,
    duty: String,
    mileage: Number,
    price: Number,
    priceNegotiable: {
        type: Boolean,
        default: true
    },
    fuel: String,
    interior: String,
    color: String,
    engineSize: Number,
    description: String,
    description: String,
    features:[{
        type: String
    }],
    location: String,
    seller: {
        sellerID:{
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        sellerNumber:{
            type:  Schema.Types.Number,
            ref: 'user'
        },
        sellerEmail:{
            type:  Schema.Types.String,
            ref: 'user'
        } ,  
        
        sellerName:{
            type:  Schema.Types.String,
            ref: 'user'
        },
        sellerPhoto:{
            type: Schema.Types.String,
            ref: 'user'
        },
        sellerAvailableSince:{
            type: Schema.Types.String,
            ref: 'user'
        }    
    },

    images:[{
        type: String
    }],

    status: {
        type: String,
        default: 'underreview',
        enum: ['underreview', 'active', 'declined', 'sold']
    },

    featured: {
        startDay: {
            type: Date,
            default: Date.now
        },
        endDay: {
            type: Date,
            default: Date.now
        },

        featuredCarPackage:{
            packageName:{
                type: String,
                default: 'noPackage'
            },
            packagePrice:{
                type: String,
                default: 'noPrize'
            }
        }
    },
    views:{
        type:Number,
        default:0
    },

},{ timestamps: true });
const Car = mongoose.model('car', carSchema);
module.exports = Car;
