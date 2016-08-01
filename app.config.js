(function() {
  'use strict';

  angular
    .module('todoApp')
    .config(config);

    function config($routeProvider) {
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
    }
}());
