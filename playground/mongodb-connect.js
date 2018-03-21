/*const MongoClient = require('mongodb').MongoClient;
*/
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {

	if(err) {
		return console.log('Unable to connect to MnongoDB server');
	}

	console.log('Connected to MongoDB server');

	db.collection('Todos').insertOne({

		text:'SOmething added',
		completed:false

	}, (err, result) => {

		if(err) {
			return console.log('Unable to insert todo')
		}

		console.log(JSON.stringify(result.ops, undefined, 2));

	});


	db.collection('Users').insertOne({

		name:'Viktor',
		age:23,
		location:'Philadelphia'

	}, (err, result) => {

		if(err) {
			return console.log('Unable to insert user')
		}

		console.log(JSON.stringify(result.ops, undefined, 2));

	});

	db.close();

});