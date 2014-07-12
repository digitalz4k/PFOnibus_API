'use strict';

angular.module('pfoApp')
  .factory('Session', ['$resource', function ($resource) {
    return $resource('/api/v1/session/');
  }]);
