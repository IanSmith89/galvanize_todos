(function() {
  'use strict';

  const server = 'https://galvanize-todos.herokuapp.com/is-persons';

  angular
    .module('todoApp')
    .controller('PeopleCtrl', PeopleCtrl)
    .controller('TodoListCtrl', TodoListCtrl)
    .controller('PersonCtrl', PersonCtrl);

    PeopleCtrl.$inject = ['$http'];
    TodoListCtrl.$inject = ['$http'];
    PersonCtrl.$inject = ['$http', '$routeParams'];

    function PeopleCtrl($http) {
      this.nameToAdd = '';
      this.people = [];

      this.addPerson = () => {
        return $http.post(server, { name: this.nameToAdd })
          .then((res) => {
            res.data.todos = [];
            this.people.push(res.data);
            this.nameToAdd = '';
          })
          .catch((err) => {
            throw err;
          });
      };

      const activate = () => {
        return $http.get(server)
          .then((people) => {
            this.people = people.data;

            this.people.forEach((person) => {
              $http.get(`${server}/${person.id}/is-todos`)
                .then((todos) => {
                  person.todos = todos.data;
                })
                .catch((err) => {
                  throw err;
                });
            });
          })
          .catch((err) => {
            throw err;
          });
      };

      activate();
    }

    function TodoListCtrl($http) {
      this.todoToAdd = '';

      this.addTodo = (person) => {
        return $http.post(`${server}/${person.id}/is-todos`, {
          completed: false,
          text: this.todoToAdd
        })
          .then((res) => {
            person.todos.push(res.data);
            this.todoToAdd = '';
          })
          .catch((err) => {
            throw err;
          });
      };
    }

    function PersonCtrl($http, $routeParams) {
      this.person = {};

      const { id } = $routeParams;

      const activate = () => {
        return $http.get(`${server}/${id}`)
          .then((person) => {
            this.person = person.data;

            return $http.get(`${server}/${id}/is-todos`);
          })
          .then((todos) => {
            this.person.todos = todos.data;
          })
          .catch((err) => {
            throw err;
          });
      };

      activate();
    }
}());
