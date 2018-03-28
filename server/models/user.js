var mongoose  = require('mongoose');
const validator = require('validator');
var jwt = require('jsonwebtoken'); 
const _ = reuire('lodash');

var UserSchema = new mongoose.Schema({
	email: {
		type:String,
		required:true,
		minglength:1,
		trim:true,
		unique:true,
		validate: {
			validator:validator.isEmail,
			message:'{VALUE} is not a valid email'
		}
	},
	password: {
		type:String,
		require:true,
		minLength:6
	},
	tokens:[{
		access: {
			type:String,
			require:true
		},
		token: {
			type:String,
			require:true
		}
	}]
});

UserSchema.methods.toJSON = function() {

	var user = this;
	var userObject = user.toObject();

	return _.pick(userObject, ['_id', 'email']);

};

// register own method

UserSchema.methods.generateAuthToken = function() {

	var user = this;
	var access = 'auth';
	var token = jwt.sign({_id:user._id.toHexString(), access}, 'abc123').toString();

	user.tokens.push({
		access,
		token
	});

	return user.save().then((user) => {
		
		return token;
	
	});

};

var User = mongoose.model('User', UserSchema)

module.exports = {User};