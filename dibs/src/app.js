(function() {
  'use strict';

  angular.module('dibs', ['ngStorage', 'socketServices', 'ui.router'])
    .constant('currentUser', null)
    .config(config)
    .run(runner);

  config.$inject = ['$provide', '$stateProvider', '$urlRouterProvider', 'environmentsProvider'];
  function config($provide, $stateProvider, $urlRouterProvider, environments) {
    $provide.constant('currentUser', window.spOctopus.user);
    environments.setDashboardData(window.spOctopus.dashboard);

    $urlRouterProvider.otherwise('');
    $stateProvider
      .state('blank', {
        template: ''
      })
      .state('dashboard', {
        url: '/',
        template: '<dibs></dibs>'
      });
  }

  runner.$inject = ['$browser', '$state', '$location'];
  function runner($browser, $state, $location) {
    changeState($state, $location.$$url);
    $browser.onUrlChange(function() {
      changeState($state, $location.$$url);
    })
  }

  function changeState($state, url){
    var state = urlToState(url, $state) || $state.get('blank');
    $state.go(state.name, {}, {location: false});
  }

  function urlToState(url, $state) {
    return _.find($state.get(), {'url': url});
  }
})();