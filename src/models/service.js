const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const schema = new mongoose.Schema({
    _id: {
        type: String,   
    },
    type: {
        type: String,
        enum: [ "Normal House Clean", "Move Out Clean", "Kitchen Clean", "Office Clean", "Others" ],
        required: true,
     },
     numberOfServiceRoom: {
        type: String,
        required: true,
        trim: true,
    },
    serviceDescription: {
        type: String,
    },
    tradieName: {
        type:String,
        required: true,
    },
    servicePrice: {
        type:String,
        required: true,
    },
    tradieEmail: {
        type:String,
        required: true,
        trim:true,
    }, 
    tradiePhone: {
        type:String,
        required: true,
    },
});

const Model = mongoose.model('Service', schema);
module.exports = Model;