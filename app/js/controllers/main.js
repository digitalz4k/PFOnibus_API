'use strict';

angular.module('pfoApp')
    .controller('MainCtrl', function ($scope, User) {
        $scope.brand = "Digitalz";
        $scope.userId = User.id;
        $scope.name = User.name;
        $scope.role = User.role;
        $scope.email = User.email;
    });