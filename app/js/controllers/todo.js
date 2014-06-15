 'use strict';

angular.module('sdkApp')
 .controller('TodoCtrl', ['$scope', 'Api', function ($scope, Api) {
        $scope.title = "Todo List";
        $scope.orderProp = 'updatedAt';

        $scope.todos = Api.Todo.query();
        $scope.t = {};

        $scope.addTodo = function(){
            var todo = Api.Todo.save(null, $scope.t, function(){
                $scope.todos.push(todo);
                $scope.t = {};
            });
        };

        $scope.removeTodo = function(todo){
            Api.Todo.delete({id: todo._id}, function(){
                $scope.todos.splice($scope.todos.indexOf(todo), 1);
            });
        };
    }]);