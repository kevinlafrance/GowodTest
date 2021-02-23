var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema([{
	'id': { type:String, required:true, unique:true, index:true, default:mongoose.Types.ObjectId },
	'firstname' : String,
	'lastname' : String,
	'age' : String,
	'email' : String,
	'password' : String
}]);

module.exports = mongoose.model('user', userSchema);
