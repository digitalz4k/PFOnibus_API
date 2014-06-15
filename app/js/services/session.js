'use strict';

angular.module('sdkApp')
  .factory('Session', function ($resource) {
    return $resource('/api/v1/session/');
  });
