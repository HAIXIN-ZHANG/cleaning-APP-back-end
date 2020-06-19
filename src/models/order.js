const mongoose = require('mongoose');
// const Joi = require('@hapi/joi');

const schema = new mongoose.Schema({

    startDate: {
        type: Date,
        require: true,
        default: Date.now,
    },
    finishedDate:{
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
    status: {
        type: String,
        enum:['In Processing', 'Cancelled', 'Waiting Response', 'Finished'],
        default: 'Waiting Response',
    },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    tradie: { type: mongoose.Schema.Types.ObjectId, ref: 'Tradie' },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
});

const Model = mongoose.model('Order', schema);
module.exports = Model;