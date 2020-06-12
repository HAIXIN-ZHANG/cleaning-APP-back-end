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
});

const Model = mongoose.model('Client', schema);
module.exports = Model;