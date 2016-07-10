(function() {
  'use strict';

  angular.module('dibs')
    .factory('dibsPrompt', dibsPrompt);

  dibsPrompt.$inject = ['$q'];
  function dibsPrompt($q) {
    return function(description) {
      var rsp = prompt(description);
      if (_.isNull(rsp)) {
        return $q.reject();
      } else {
        return $q.resolve(rsp);
      }
    }
  }

})();