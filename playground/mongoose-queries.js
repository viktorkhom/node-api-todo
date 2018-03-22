const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


/*var id = '5ab402c0aaa899001e7d05aa';

if(!ObjectID.isValid(id)) {

	console.log('ID not valid');

}*/

/*Todo.find({
	
	_id:id

}).then((todos) => {

	console.log('Todos', todos);

});

Todo.findOne({
	
	_id:id

}).then((todo) => {

	console.log('Todo', todo);

});*/

User.findById('5ab3da83b4b2e048140d2d5d').then((user) => {

	if(!user) {
		console.log('Not found user with this id');
	}

	console.log('Xax, this is user:', user);
	
}).catch((err) => {

	console.log(err);
	
});