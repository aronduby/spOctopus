(function() {
  'use strict';

  angular.module('dibs')
    .directive('project', directive);

  directive.$inject = ['dibsPrompt', 'dibsService'];
  function directive(dibsPrompt, dibsService) {
    return {
      restrict: 'E',
      templateUrl: 'dibs/project/tmpl.project.html',
      scope: {
        item: '='
      },
      controller: ctrl,
      controllerAs: '$ctrl',
      bindToController: true,
      link: link
    };

    function ctrl() {
      var self = this;

      this.clear = clear;
      this.claim = claim;

      function clear() {
        dibsService.clear(_.pick(self.item, ['EnvironmentId', 'ProjectId']));
      }

      function claim() {
        dibsPrompt('What are you working on?')
          .then(function(description) {
            var tmp = _(self.item)
              .pick(['EnvironmentId', 'ProjectId'])
              .assign({'Description': description})
              .value();

            dibsService.claim(tmp);
          });
      }
    }

    function link(scope, el, attr) {
      attr.$set('data-environment-id', scope.$ctrl.item.EnvironmentId);
      attr.$set('data-project-id', scope.$ctrl.item.ProjectId);
    }
  }

})();