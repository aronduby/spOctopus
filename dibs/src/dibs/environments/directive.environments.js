(function() {
  'use strict';

  angular.module('dibs')
    .directive('environment', directive);

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
      bindToController: true,
      link: link
    };

    function ctrl() {}

    function link(scope, el, attr) {
      el.on('mouseover', function() {
        var left = offset(el[0]).left;
        el.find('section').css('left', left+'px');
      })
    }
  }


  function offset( elem, options ) {
    //...

    var docElem, win, rect, doc;

    if ( !elem ) {
      return;
    }

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