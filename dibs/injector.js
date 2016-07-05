(function() {
  'use strict';

  var s = document.createElement('script');
  s.src = chrome.extension.getURL('dibs/dist/all.js');
  (document.head || document.documentElement).appendChild(s);
  s.onload = function() {
    s.parentNode.removeChild(s);
  };

})();