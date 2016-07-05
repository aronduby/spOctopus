(function() {
  'use strict';

  angular.module('dibs')
    .directive('dibsEnvironment', directive);

  directive.$inject = [];
  function directive() {
    return {
      restrict: 'E',
      templateUrl: 'dibs/environments/tmpl.environment.html',
      scope: {
        env: '='
      },
      controller: ctrl,
      controllerAs: '$ctrl',
      bindToController: true
    };

    function ctrl() {

      
    }
  }

})();