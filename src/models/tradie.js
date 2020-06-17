const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const schema = new mongoose.Schema({

   tradieName: {
        type: String,
        required: true,       
    },
    ABN: {
        type: String,
        required: true,
    },
   tradieHours: {
        type: String,
        default:'8AM-5PM'
    },
   tradieDescription: {
        type: String,
        require:true,
    },
   tradieAddress: {
        type: String,
        require:true,
    },
   tradieEmail: {
        type: String,
        required: true,
        validate: {
          validator: email => !Joi.validate(email, Joi.string().email()).error,
          msg: 'Invalid email format'
        }
    },
   tradiePhone: { 
        type: String,
        required: true,
        trim: true,
    },
    tradiePhoto: {
        type: String,
        // default:
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },

});

const Model = mongoose.model('Tradie', schema);
module.exports = Model;