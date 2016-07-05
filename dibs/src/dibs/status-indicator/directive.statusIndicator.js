(function() {
  'use strict';

  angular.module('dibs')
    .directive('statusIndicator', directive);

  directive.$inject = [];
  function directive() {
    return {
      restrict: 'E',
      templateUrl: 'dibs/status-indicator/tmpl.statusIndicator.html',
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