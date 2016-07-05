(function() {
  'use strict';

  angular.module('dibs')
    .directive('dibs', directive);

  directive.$inject = ['environmentsServiceMock'];
  function directive(environments) {
    return {
      templateUrl: 'dibs/tmpl.dibs.html',
      controller: ctrl,
      controllerAs: '$ctrl'
    };

    function ctrl() {
      this.environments = environments.all;
    }
  }
})();