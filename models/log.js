import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var schema = new Schema({
	title: {type: String, required: true},
	description: {type: String, required: true}
});

module.exports = mongoose.model('Log', schema);