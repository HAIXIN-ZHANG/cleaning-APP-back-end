const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const schema = new mongoose.Schema({
    _id:{
        type: String,
        uppercase: true,
        alias:'account',
    },
    password: {
        type: String,
        required: true,
        select: false,
      },
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        validate: {
          validator: email => !Joi.validate(email, Joi.string().email()).error,
          msg: 'Invalid email format'
        }
    },
    phone: { 
        type: String,
        required: true,
        trim: true,
    },
    description: { 
        type: String,
    },
    address: { 
        type: String,
        required: true,
    },
    role:{
        enum: [ 'client', 'tradie' ],
        required: true,
    },
    image: {
        type: String,
        validate: {
            validator: url => !Joi.validate(url, Joi.string().uri()).error,
            msg: 'Invalid url format'
        }
    },

    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    tradie: { type: mongoose.Schema.Types.ObjectId, ref: 'Tradie' },

});

const Model = mongoose.model('User', schema);
module.exports = Model;