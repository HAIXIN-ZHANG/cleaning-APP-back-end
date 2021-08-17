const mongoose = require('mongoose')
// const Joi = require('@hapi/joi');

const schema = new mongoose.Schema({
	type: {
		type: String,
		enum: [
			'Normal House Clean',
			'Move Out Clean',
			'Kitchen Clean',
			'Office Clean',
			'Others',
		],
		required: true,
		default: 'Normal House Clean',
	},
	numberOfServiceRoom: {
		type: String,
		enum: ['1', '2', '3', '4', '5', '5+'],
		required: true,
	},
	housingType: {
		type: String,
		enum: ['apartment', 'house', 'townhouse'],
		default: 'apartment',
		required: true,
	},
	serviceDescription: {
		type: String,
	},
	servicePrice: {
		type: String,
		required: true,
	},

	tradie: { type: mongoose.Schema.Types.ObjectId, ref: 'Tradie' },
})

const Model = mongoose.model('Service', schema)
module.exports = Model
