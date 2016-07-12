(function() {
  'use strict';

  angular.module('dibs')
    .directive('environment', directive);

  directive.$inject = ['dibsPrompt', 'dibsService', 'getOffset'];
  function directive(dibsPrompt, dibsService, getOffset) {
    return {
      restrict: 'E',
      templateUrl: 'dibs/environments/tmpl.environment.html',
      scope: {
        env: '='
      },
      controller: ctrl,
      controllerAs: '$ctrl',
      bindToController: true,
      link: link
    };

    function ctrl() {
      var self = this;

      this.clearAll = clearAll;
      this.claimAll = claimAll;

      function clearAll() {
        dibsService.clear(getAll());
      }

      function claimAll() {
        dibsPrompt("What are you working on?")
          .then(function(description) {
            dibsService.claim(getAll({'Description': description}));
          })
      }

      function getAll(additional) {
        return _.map(self.env.Items, function(item) {
          return _(item)
            .pick(['EnvironmentId', 'ProjectId'])
            .assign(additional)
            .value();
        })
      }
    }

    function link(scope, el, attr) {
      var popup = el.find('section');

      el.on('mouseenter', function() {
        var elOffset = getOffset(el[0]);
        var popupOffset = getOffset(popup[0]);

        var left = (elOffset.left + elOffset.width/2 ) - popupOffset.width / 2;
        left = Math.max(0, left);
        if ((left + popupOffset.width /2) > document.body.clientWidth) {
          left = document.body.clientWidth - popupOffset.width / 2;
        }

        popup.css({
          'left': left + 'px',
          'bottom': elOffset.height + 'px'
        });
      });

      attr.$set('data-Id', scope.$ctrl.env.Id);
    }
  }

})();