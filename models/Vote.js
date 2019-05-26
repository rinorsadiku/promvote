const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
	male: {
		required: true,
		type: String
	},
	female: {
		required: true,
		type: String
	},
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	dateSent: Date
});

mongoose.model('votes', VoteSchema);
