const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose}  = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {

	var todo = new Todo({

		text:req.body.text,
		_creator:req.user._id

	});

	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/todos', authenticate, (req, res) => {
	
	Todo.find({
		_creator:req.user._id
	}).then((todos) => {
		res.send({
			todos
		});
	}, (e) => {
		res.status(400).send(e);
	});

});

app.get('/todos/:id', (req, res) => {
	
	var id = req.params.id;

	Todo.findById(id).then((todo) => {

		if(!todo) {
			console.log('Not found todo with this id');
		}

		console.log('Xax, this is todo:', todo);

		res.send({todo});
		
		}).catch((err) => {

			console.log(err);
			
		});

});

app.delete('/todos/:id', (req, res) => {

	var id = req.params.id;
	
	Todo.findByIdAndRemove(id).then((todo) => {

		if(!todo) {

			return res.status(404).send();

		}

		console.log('Xax, this is todo:', todo);

		res.send({todo});
		
		}).catch((err) => {

			console.log(err);
			
		});
});

// update

app.patch('/todos/:id', (req, res) => {

	var id = req.params.id;
	var body = _.pick(req.body, ['text', 'completed']);

	console.log('Get body', body);

	if(!ObjectID.isValid(id)) {

		return res.status(404).send();

	}

	if(_.isBoolean(body.completed) && body.completed) {
		
		body.completedAt = new Date().getTime();

	}

	else {
		body.completed = false;
		body.completedAt = null;
	}

	console.log('Change body', body);

	Todo.findByIdAndUpdate(id, {$set:body}, {new:true})
	    .then((todo) => {

	    	if(!todo) {
				return res.status(404).send();
	    	}

	    	res.send({todo});

	    }).catch((e) => {
			
			res.status(404).send();

	    });

});


// security and auth requests

app.post('/users', (req, res) => {

	var body = _.pick(req.body, ['email', 'password']);

	var user = new User(body);

	user.save().then(() => {
		return user.generateAuthToken();
	}).then((token) => {
		res.header('x-auth', token).send(user);
	}).catch((e) => {
		res.status(400).send(e);
	});
});

app.post('/users/login', (req, res) => {

	var body = _.pick(req.body, ['email', 'password']);

	user.findByCredentials(body.email, body.password)
	.then((user) => {

		return user.generateAuthToken().then((token) => {

			res.header('x-auth', token).send(user);

		});

	}).catch((e) => {

		res.status(400).send();

	});

});

app.get('/users/me', authenticate, (req,res) => {

	res.send(req.user);

});

app.delete('/users/me/token', authenticate, (req, res) => {

	req.user.removeToken(req.token).then(() => {

		res.status(200).send();

	}, () => {
		res.status(400).send();
	});

});

app.listen(3000, () => {
	console.log('Started on port 3000');
});

module.exports = {app};

