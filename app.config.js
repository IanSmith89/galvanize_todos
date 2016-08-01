(function() {
  'use strict';

  const app = angular.module('todoApp');

  app.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home.html',
        controller: 'PeopleCtrl',
        controllerAs: 'peopleList'
      })
      .when('/person/:id', {
        templateUrl: 'person.html',
        controller: 'PersonCtrl',
        controllerAs: 'personList'
      });
  });
}());
