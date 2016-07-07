(function() {
  'use strict';

  angular.module('dibs')
    .directive('project', directive);

  directive.$inject = [];
  function directive() {
    return {
      restrict: 'E',
      templateUrl: 'dibs/project/tmpl.project.html',
      scope: {
        item: '='
      },
      controller: ctrl,
      controllerAs: '$ctrl',
      bindToController: true
    };

    function ctrl() {

    }
  }

})();