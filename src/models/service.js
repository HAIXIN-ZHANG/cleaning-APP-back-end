const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const schema = new mongoose.Schema({
    _id: {
        type: String,   
    },
    type: {
        enum: [ "Normal House Clean", "Move Out Clean", "Kitchen Clean", "Office Clean", "Others" ],
        required: true,
     },
     number_of_service_room: {
        type: String,
        required: true,
        trim: true,
    },
    service_time: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    service_description: {
        type: String,
    },
    trader_name: {

    },
    service_price: {

    },
    membership_service_price: {

    }, 
    Trader_email: {

    }, 
    Trader_phone: {

    },
    email: {
        
    },
    phone: { 
        type: String,
        required: true,
        trim: true,
    },
    
});

const Model = mongoose.model('Service', schema);

module.exports = Model;