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
    role:{
        type: String,
        enum: [ 'client', 'tradie' ],
        required: true,
        default: 'client',
    },

    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    tradie: { type: mongoose.Schema.Types.ObjectId, ref: 'Tradie' },

});

const Model = mongoose.model('User', schema);
module.exports = Model;