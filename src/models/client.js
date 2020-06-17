const mongoose = require('mongoose');
// const Joi = require('@hapi/joi');

const schema = new mongoose.Schema({

    clientName:{
        type: String,
        required: true,       
    },
    membership:{
        type: Boolean,
        default: false,
    },
    clientDescription: {
        type: String,
    },
    clientEmail: {
        type: String,
        required: true,
        validate: {
          validator: email => !Joi.validate(email, Joi.string().email()).error,
          msg: 'Invalid email format'
        }
    },
    clientPhone: { 
        type: String,
        required: true,
        trim: true,
    },
    clientPhoto: {
        type: String,
        // default:
    },

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    
});

const Model = mongoose.model('Client', schema);
module.exports = Model;