const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema({
    _id:{
        type: String,
        uppercase: true,
        alias:'account',
    },
    password: {
        type: String,
        required: true,
        
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
    __v: { type: Number, select: false }, // hide version
    createdAt: { type: Date, select: false }

},
 {
    timestamps: true, // show timestamp
    toJSON: {
      virtuals: true // required to show 'code' property
    },
    id: false // hide `id` virtual property

 }
);
schema.methods.hashPassword = async function() {
    this.password = await bcrypt.hash(this.password, 10);
};

schema.methods.validatePassword = async function(password) {
    const validPassword = await bcrypt.compare(password, this.password);
    return validPassword;
};
const Model = mongoose.model('User', schema);
module.exports = Model;