/*const MongoClient = require('mongodb').MongoClient;
*/
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {

	if(err) {
		return console.log('Unable to connect to MnongoDB server');
	}

	console.log('Connected to MongoDB server');
	
	//deleteMany
	/*db.collection('Todos').deleteMany({
		text:'SOmething added'
	}).then((result) => {

		console.log(result);

	});*/

	//deleteOne

	/*db.collection('Todos').deleteOne({
		text:'SOmething added'
	}).then((result) => {

		console.log(result);

	})*/

	// findOneAndDelete

	/*db.collection('Users').findOneAndDelete({
		name:'Lolita'
	}).then((result) => {

		console.log(result);

	})*/

	/*db.collection('Users').findOneAndDelete({
		_id:new ObjectID('5ab25d39a0420d0700a5cc56')
	}).then((result) => {

		console.log(result);

	});*/


	/*db.close();*/

});