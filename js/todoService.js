/**
 * Created by Administrator on 2016/12/10 0010.
 */
(function (angular) {
    angular.module('todoApp.todoSrv', []).service('todoSrv', ['$window',function($window){
            var storage=$window.localStorage;
            var dataStr=storage.getItem('todo');
            var todoList=JSON.parse(dataStr)||[];
            //获取数据
            this.getData=function(){
                console.log(todoList);
                return todoList;

            };
            //保存数据
            this.saveData=function(){
                storage.setItem('todo',JSON.stringify(todoList));
            };
            //添加数据
            this.add=function(newTask){
                var id;
                if(todoList.length==0){
                    id=0;
                }
                else{
                    id=todoList[todoList.length-1].id+1;
                }
               todoList.push({id:id,name:newTask,isCompleted:false});
                this.saveData();
            };
            //删除数据
            this.remove=function(id){
                for(var i=0;i<todoList.length;i++){
                    var temp=todoList[i];
                    if(temp.id==id){
                       todoList.splice(i,1);
                        this.saveData();
                        return;
                    }
                }
            };
        this.selectAll=function(isCheckedAll){
            for(var i=0;i<todoList.length;i++){
                todoList[i].isCompleted=isCheckedAll;
            }
        };
        //清楚已完成任务
        this.clearCompleted=function(){
            var temp=[];
            for(var i=0;i<todoList.length;i++){
                var todo=todoList[i];
                if(!todo.isCompleted){
                    temp.push(todo);
                }
            }
            todoList = temp;
         }
        }]);

})(angular);