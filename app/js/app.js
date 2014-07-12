angular.module('pfoApp', [
  'ngCookies',
  'ngRoute',
  'ngAnimate',
  'ngResource',
  'ngSanitize'
  ])

.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true);

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
      otherwise({
        redirectTo:'/'
      });

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
  }])
  .run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {

      if (next.authenticate && !Auth.isLoggedIn()) {
        $location.path('/login');
      }
    });
  }]);