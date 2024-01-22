// models/Contact.js

const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	phone: {
		type: Number,
		unique: true,
		required: true,
	},
	email: {
		type: String,
	},
	address: String,
});

module.exports = mongoose.model('Contact', contactSchema);
