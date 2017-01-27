var bogoTodo = angular.module('bogoTodo',[]);	//root element of entire client end

function mainController($scope, $http)
{
	$scope.formData = {};

	//When Page opens, make get request
	$http.get('/api/todo')
        .success(function(data) {
            $scope.todos = data;
            console.log(JSON.stringify(data));
        })
        .error(function(err) {
            console.log('Error: ' + err);
        });

    //Function to submit a todo
    $scope.createTodo = function(){
    	//Post when creating todo as form data sent as part of body
    	$http.post('api/todo', $scope.formData)
    		.success(function(data)
    		{
    			$scope.formData = {};	//to enable user to make new entries
    			$scope.todos = data;	//Initialize todos variable with todos received
    			console.log(JSON.stringify(data));	//See data received on console
    		})
    		.error(function(err) {
            console.log('Error: ' + err);
        	});
    };

    $scope.delete = function(data)
    {
        var checkboxes = document.getElementsByClassName('boxes');
        for(var i = 0 ; i < checkboxes.length ; ++i)
        {
            if(checkboxes[i].checked)
                $scope.deleteTodo(data[i]._id)
        }
    }

    //Function to delete selected todos
    $scope.deleteTodo = function(_id){
    	$http.delete('api/todo/'+_id)
    	.success(function(data)
    	{
    		$scope.todos = data;
    		console.log(JSON.stringify(data));
    	})
    	.error(function(err)
    	{
    		console.log('Error : '+ err);
    	});
    };
}