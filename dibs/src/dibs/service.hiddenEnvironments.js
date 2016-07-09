(function(){
  'use strict';

  angular.module('dibs')
    .factory('hiddenEnvironments', hiddenEnvironments);

  hiddenEnvironments.$inject = ['$localStorage'];
  function hiddenEnvironments($localStorage) {
    var storage = $localStorage.$default({
      hidden: []
    });

    return storage;
  }

})();