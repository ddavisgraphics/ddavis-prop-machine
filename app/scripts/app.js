'use strict';

/**
 * @ngdoc overview
 * @name propMachineApp
 * @description
 * # propMachineApp
 *
 * Main module of the application.
 */
angular
  .module('propMachineApp', [
    'ngCookies',
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/getStarted', {
        templateUrl: 'views/getStarted.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
