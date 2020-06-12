const mongoose = require('mongoose');
// const Joi = require('@hapi/joi');

const schema = new mongoose.Schema({

    businessName:{
        type: String,
        required: true,       
    },
    ABN:{
        type: String,
        required: true,
    },
    businessHours:{
        type: String,
    },
});

const Model = mongoose.model('Tradie', schema);
module.exports = Model;