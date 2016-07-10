(function() {
  'use strict';

  angular.module('dibs')
    .factory('dibsService', dibsService);

  dibsService.$inject = ['$q', 'socket', 'currentUser'];
  function dibsService($q, socket, user) {
    var all = null;

    return {
      getAll: getAll,
      claim: claim,
      clear: clear
    };

    function getAll() {
      if (!_.isNull(all)) {
        return $q.resolve(all);
      }

      return $q(function(resolve, reject) {
        socket.emit('getAll', function(e, data) {
          if (e) {
            return reject(e);
          }

          resolve(data);
        })
      })
    }

    function claim(items) {
      items = makeArray(items);
      socket.emit('claim', items, user);
    }

    function clear(items) {
      items = makeArray(items);
      socket.emit('clear', items, user);
    }

    function makeArray(arg) {
      if (!_.isArray(arg)) {
        return [arg];
      } else {
        return arg;
      }
    }
  }

})();