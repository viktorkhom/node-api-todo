var {User} = require('./../models/user');

var authenticate = (req, res, next) => {

	var token = req.header('x-auth');

	User.findByToken(token).then((user) => {

		if(!user) {
			return Promise.reject();
		}

		req.user = user;
		req.token = token;

		// go to the (req, res) func after "authenticate"
		// in app.get();
		// if not write here next after authenticate
		// nothing happens!
		
		next();

	}).catch((e) => {
		res.status(401).send();
	})
};

module.exports = {authenticate};