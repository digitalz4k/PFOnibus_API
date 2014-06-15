'use strict';

angular.module('sdkApp', [
  'ngCookies',
  'ngRoute',
  'ngAnimate',
  'ngResource',
  'ngSanitize'
  ])

.config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      }).
      when('/login', {
        templateUrl: 'partials/login',
        controller: 'LoginCtrl'
      }).
      when('/signup', {
        templateUrl: 'partials/signup',
        controller: 'SignupCtrl'
      }).
      when('/settings', {
        templateUrl: 'partials/settings',
        controller: 'SettingsCtrl',
        authenticate: true
      }).
      when('/todos/', {
        templateUrl: 'partials/todo',
        controller: 'TodoCtrl',
        authenticate: true
      }).
      otherwise({
        redirectTo:'/'
      });

      $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
      return {
        'responseError': function(response) {
          if(response.status === 401) {
            $location.path('/login');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    }]);
  })
  .run(function ($rootScope, $location, Auth) {

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {

      if (next.authenticate && !Auth.isLoggedIn()) {
        $location.path('/login');
      }
    });
  });