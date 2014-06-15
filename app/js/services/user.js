'use strict';

angular.module('sdkApp')
  .factory('User', function ($resource) {
    return $resource('/api/v1/users/:id', {
      id: '@id'
    }, { //parameters default
      update: {
        method: 'PUT',
        params: {}
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
