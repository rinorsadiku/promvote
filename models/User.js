const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
	providerId: {
		required: true,
		type: String
	},
	name: {
		required: true,
		type: String
	},
	provider: String,
	voted: {
		type: Boolean,
		default: false
	}
});

mongoose.model('users', UserSchema);
