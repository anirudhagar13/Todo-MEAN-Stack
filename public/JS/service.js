//Creating a new factory service
angular.module('todoService',[])

//Service function
.factory('Todos',function($http){
	//each returns a promise object for a service
	return{
		get : function(){
			return $http.get('/api/todo');
		},
		create : function(todoData){
			return $http.post('/api/todo',todoData);
		},
		delete : function(_id){
			return $http.delete('/api/todo/'+_id);
		}
	}
});
