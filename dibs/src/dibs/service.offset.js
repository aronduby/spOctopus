(function() {
  'use strict';

  angular.module('dibs')
    .service('getOffset', getOffset);

  function getOffset() {
    return function(elem) {
      var docElem, win, rect, doc;

      rect = elem.getBoundingClientRect();

      // Make sure element is not hidden (display: none) or disconnected
      if (rect.width || rect.height || elem.getClientRects().length) {
        doc = elem.ownerDocument;
        win = window;
        docElem = doc.documentElement;

        return {
          top: rect.top + win.pageYOffset - docElem.clientTop,
          left: rect.left + win.pageXOffset - docElem.clientLeft,
          width: rect.width,
          height: rect.height
        };
      }
    }
  }

})();