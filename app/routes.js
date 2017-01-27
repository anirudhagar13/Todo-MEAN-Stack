//Load the todo model
var Todo = require('./models/todo')

//Expose Routes to Server, gets instance of express
module.exports = function(app){
	
	//Get all todos
	app.get('/api/todo',function(req, res){
		Todo.find(function(err,todos)
			{
				if(err)	//Error in finding todos
					res.send('Error in Fetching, Check Your Connection');
				else
					res.json(todos);
			});
	});

	//Create a new and send back all todos
	app.post('/api/todo',function(req, res){
		Todo.create({
			text: req.body.text,
			done: false
		}, function(err,todo)
		{
			if(err)	//Error in adding documents
				res.send('Error in Fetching, Check Your Connection');
			
			Todo.find(function(err,todos) //Find after creation of new todo
			{
				if(err)	//Error in finding todos
					res.send('Error in Fetching, Check Your Connection');
				else
					res.json(todos);
			});
		});
	});

	//Delete a requested todo
	app.delete('/api/todo/:todo_id', function(req, res){
		Todo.remove({
			_id: req.params.todo_id
		}, function(err,todo)
		{
			if(err)	//Error in adding documents
				res.send('Error in Fetching, Check Your Connection');
			
			Todo.find(function(err,todos) //Find after deletion of new todo
			{
				if(err)	//Error in finding todos
					res.send('Error in Fetching, Check Your Connection');
				else
					res.json(todos);
			});
		});
	});
}