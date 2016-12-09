(function (angular) {
	'use strict';
	var app=angular.module('todoApp',[]);
	app.controller('myCtrl',['$scope',function($scope){
		$scope.todoList=[
		{id: 0, name: '吃饭', isCompleted: false},
		{id: 1, name: '睡觉', isCompleted: true},
		{id: 2, name: '敲代码', isCompleted: false},
		{id: 3, name: '打豆豆', isCompleted: false}
		];
		$scope.newTask='';
		$scope.add=function(){
			var id=0;
			if(!$scope.newTask){
				return;
			}
			if($scope.newTask.length===0){
				id=0;
			}
			else{
				id=$scope.todoList[$scope.todoList.length-1].id+1;
			}
			$scope.todoList.push({id:id,name:$scope.newTask,isCompleted:false});
			$scope.newTask="";
		}
	}])

})(angular);
