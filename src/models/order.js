const mongoose = require('mongoose');
// const Joi = require('@hapi/joi');

const schema = new mongoose.Schema({

    _id: {
        type: String,   
    },
    startDate: {
        type: Date,
        require: true,
        default: Date.now,
    },
    finishedTime:{
        type: Date,
        require: true,
    },
    requireServiceTime: {
        type: String,
        require: true,
    }, 
    serviceAddress: {
        type: String,
        require: true,
    }, 
    additionalServiceRequire: {
        type: String,
    },
    postCode: {
        type: String,
        require:true,
        default:'4000'
    },
    clientName: {
        type: String,
        require: true,
    }, 
    clientPhone: {
        type: String,
        require: true,
    }, 
    status: {
        type: String,
        enum:['in processing', 'cancelled', 'waiting response', 'finished'],
        default: 'waiting response',
    },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    tradie: { type: mongoose.Schema.Types.ObjectId, ref: 'Tradie' },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
});

const Model = mongoose.model('Order', schema);
module.exports = Model;