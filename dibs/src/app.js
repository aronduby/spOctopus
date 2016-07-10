(function() {
  'use strict';

  angular.module('dibs', ['ngStorage', 'socketServices'])
    .constant('currentUser', null)
    .config(config);

  config.$inject = ['$provide', 'environmentsProvider'];
  function config($provide, environments) {

    $provide.constant('currentUser', window.spOctopus.user);
    environments.setDashboardData(window.spOctopus.dashboard);

  }
})();