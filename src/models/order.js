const mongoose = require('mongoose');
//TODO change schema according to database design
const schema = new mongoose.Schema({
    _id: {
        type: String,
        uppercase: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: { 
        type: String,
        default: 'This is default description.' 
    },
});

const Model = mongoose.model('Order', schema);

module.exports = Model;
