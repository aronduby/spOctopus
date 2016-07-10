(function() {
  'use strict';

  angular.module('dibs')
    .directive('environment', directive);

  directive.$inject = ['dibsPrompt', 'dibsService'];
  function directive(dibsPrompt, dibsService) {
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
      el.on('mouseover', function() {
        var left = offset(el[0]).left;
        el.find('section').css('left', left+'px');
      });

      attr.$set('data-Id', scope.$ctrl.env.Id);
    }
  }


  function offset( elem, options ) {
    var docElem, win, rect, doc;

    rect = elem.getBoundingClientRect();

    // Make sure element is not hidden (display: none) or disconnected
    if ( rect.width || rect.height || elem.getClientRects().length ) {
      doc = elem.ownerDocument;
      win = window;
      docElem = doc.documentElement;

      return {
        top: rect.top + win.pageYOffset - docElem.clientTop,
        left: rect.left + win.pageXOffset - docElem.clientLeft
      };
    }
  }

})();