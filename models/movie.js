const mongoose = require('mongoose');

//The schema (how our movie will look in the db)
const MovieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	genre: {
		type: String,
		enum: ['NONE', 'COMEDY', 'ROMANCE', 'HORROR', 'OTHER'],
		DEFAULT: 'NONE'
	}
});

//Query helpers - to be added for genres

//Export the model
module.exports = mongoose.model('Movie', MovieSchema);