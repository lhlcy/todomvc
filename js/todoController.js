/**
 * Created by Administrator on 2016/12/10 0010.
 */
(function (angular) {
    'use strict';
    'use strict';
    var app=angular.module('todoApp.todoCtrl',[]);
    app.controller('myCtrl',['$scope','$location','todoSrv',function($scope,$location,todoSrv){
        //$scope.todoList=[
        //    {id: 0, name: '吃饭', isCompleted: false},
        //    {id: 1, name: '睡觉', isCompleted: true},
        //    {id: 2, name: '敲代码', isCompleted: false},
        //    {id: 3, name: '打豆豆', isCompleted: false}
        //];
        $scope.todoList=todoSrv.getData();
        //数据添加
        $scope.newTask='';
        $scope.add=function(){
            if(!$scope.newTask){
                return;
            }
          todoSrv.add($scope.newTask);
            $scope.newTask="";
        };
        //	数据删除
        $scope.remove=function(id){
            todoSrv.remove(id);
        };
        //	修改数据
        $scope.updateID=-1;
        $scope.update=function(id){
            $scope.updateID=id;
        };
        $scope.save=function(){
            $scope.updateID=-1;
            todoSrv.saveData();
        };
        //	切换任务选中的状态
        $scope.isCheckedAll = false;
        $scope.selectAll=function(){
            todoSrv.selectAll();
        };
        $scope.$watch('todoList',function(newValue,oldValue){
            if(newValue===oldValue) return;
            todoSrv.saveData($scope.isCheckedAll);
        },true);
        // 6 清除已完成任务
        $scope.clearCompleted=function(){
           todoSrv.clearCompleted();
            $scope.todoList=todoSrv.getData();

            // 清除数组：
            // $scope.todoList.length = 0;
            // [].push.apply($scope.todoList, temp);
            //todoList.push(...temp);//ES6
        };
        $scope.isShow = function() {
            for(var i = 0; i < $scope.todoList.length; i++) {
                var todo = $scope.todoList[i];
                if(todo.isCompleted) {
                    // 说明 有已完成的任务，就返回：true，让按钮展示出来
                    return true;
                }
            }

            return false;
        };
        // 7 显示未完成任务数
        $scope.getCount=function(){
            var count=0;
            $scope.todoList.forEach(function(value){
                if(!value.isCompleted) {
                    count += 1;
                }
            });
            return count;
        };
        //	显示不同任务
        $scope.status={};
        //$scope.checkAll=function(){
        //	$scope.status={};
        //};
        //$scope.checkActive=function(){
        //	$scope.status={isCompleted:false};
        //};
        //$scope.checkCompleted=function(){
        //	$scope.status={isCompleted:true};
        //};
        $scope.location = $location;
        $scope.$watch('location.url()', function(newValue, oldValue) {
            switch(newValue) {
                case '/':
                    $scope.status = {};
                    break;
                case '/active':
                    $scope.status = {isCompleted: false};
                    break;
                case '/completed':
                    $scope.status = {isCompleted: true};
                    break;
                default:
                    $scope.status = {};
                    break;
            }
        })
    }])

})(angular);
