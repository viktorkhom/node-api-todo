const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//remove all elements

/*Todo.remove({}).then((result) => {

	console.log(result);

});*/

Todo.findByIdAndRemove('8ab402c0aaa899001e7d05aa').then((doc) => {

	console.log(doc);

});
