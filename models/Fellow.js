const mongoose = require('mongoose');

const fellowSchema = new mongoose.Schema({
	id: {
		type: 'ObjectId'
	},
	isActive: {
		type: 'Boolean'
	},
	age: {
		type: 'Number',
		required: true
	},
	fellowship: {
		type: 'String'
	},
	name: {
		first: {
			type: 'String'
		},
		last: {
			type: 'String'
		}
	},
	email: {
		type: 'String'
	},
	about: {
		type: 'String'
	},
	registered: {
		type: 'Date'
	}
});

module.exports = mongoose.model('Fellow', fellowSchema);
