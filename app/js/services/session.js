'use strict';

angular.module('pfoApp')
  .factory('Session', function ($resource) {
    return $resource('/api/v1/session/');
  });
