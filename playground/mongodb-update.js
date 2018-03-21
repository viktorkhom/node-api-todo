/*const MongoClient = require('mongodb').MongoClient;
*/
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {

	if(err) {
		return console.log('Unable to connect to MnongoDB server');
	}

	console.log('Connected to MongoDB server');

	/*db.collection('Todos').findOneAndUpdate({
		_id:new ObjectID('5ab26e635bcc6a244cf7bfc9')
	}, {
		$set:{
			completed:true
		}
	},{
		returnOriginal:true
	}).then((result) => {

		console.log(result);

	});*/

	db.collection('Users').findOneAndUpdate({
		_id:new ObjectID('5ab26e779edbf2284cc49978')
	}, {
		$set:{
			name:"PESIK"
		},
		$inc:{
			age:1
		}
	},{
		returnOriginal:true
	}).then((result) => {

		console.log(result);

	});


	/*db.close();*/

});