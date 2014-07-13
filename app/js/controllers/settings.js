angular.module('pfoApp')
  .controller('SettingsCtrl', ['$scope', 'User', 'Auth', function ($scope, User, Auth) {
    $scope.userId = User.id;
    $scope.name = User.name;
    $scope.role = User.role;
    $scope.email = User.email;

    $scope.errors = {};

    $scope.changePassword = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
        });
      }
		};
  }]);
