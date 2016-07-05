(function() {
  'use strict';

  angular.module('dibs')
    .directive('status', directive);

  directive.$inject = [];
  function directive() {
    return {
      restrict: 'E',
      templateUrl: 'dibs/status/tmpl.status.html',
      scope: {
        dib: '='
      },
      controller: ctrl,
      controllerAs: '$ctrl',
      bindToController: true
    };

    function ctrl() {

    }
  }

})();