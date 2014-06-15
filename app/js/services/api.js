'use strict';

angular.module('sdkApp')
    .factory('Api', ['$resource', function($resource){
        return {
            Feature: $resource('features/:featureId.json', {}, {
                query: {method:'GET', params:{featureId:'features'}, isArray:true}
            }),
            Todo: $resource('http://localhost:3000/api/v1/todos/:id', {id:'@_id'})
        };
    }]);