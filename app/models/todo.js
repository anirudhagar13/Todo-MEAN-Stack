var mongo = require('mongoose')

//Exposing entire model
module.exports = mongo.model('ToDo', {
	text: String,
	done: Boolean
});