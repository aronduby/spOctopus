function prepareSocket() {

  /*
   *	The actual connection to the socket server
   *	Using a deferred style here to be able to trigger the angular bootstrap
   */
  var options = {
    'sync disconnect on unload': true,
    'max reconnection attempts': 5,
    'secure': true
  };

  var socket;

  // quick slap together a defer
  var promise = {
    okCallbacks: [],
    koCallbacks: [],
    status: null,
    data: null,
    then: function(okCallback) {
      if (this.status == 'resolved') {
        okCallback(this.data);
      } else {
        this.okCallbacks.push(okCallback);
      }
    },
    fail: function(koCallback) {
      if (this.status == 'rejected') {
        koCallback(this.data);
      } else {
        this.koCallbacks.push(koCallback);
      }
    }
  };

  var defer = {
    promise: promise,
    resolve: function(data) {
      this.promise.status = 'resolved';
      this.promise.data = data;
      this.promise.okCallbacks.forEach(function(callback) {
        window.setTimeout(function() {
          callback(data);
        }, 0)
      });
      this.promise.okCallbacks = [];
    },
    reject: function(err) {
      this.promise.status = 'rejected';
      this.promise.data = data;
      this.promise.koCallbacks.forEach(function(callback) {
        window.setTimeout(function() {
          callback(err);
        }, 0);
      });
    }
  };

  function connect(address, options) {
    socket = io.connect(address, options);
    socket.on('connect', function() {
      defer.resolve(socket);
    });
  }

  chrome.storage.sync.get('dibsServer', function(data) {
    if (!data.dibsServer) {
      return alert('No dibs server setup for spOctopus. Please visit the options page.');
    }

    connect(data.dibsServer, options);
  });

  // watch for changes to the dibsServer storage
  chrome.storage.onChanged.addListener(function(changes, namespace) {
    var change = changes['dibsServer'];
    if (change && change.newValue !== change.oldValue) {
      connect(change.newValue, options);
    }
  });


  /*
   *	Used to house our services/providers defined below
   */
  var servicesApp = angular.module('socketServices', []);


  /*
   *	Socket Provider
   * 	Direct-ish access to our socket above
   *
   *	Usage example, from within controller

   // this will bind it to the scope and clear on destroy
   socket.addScope($scope)
   .on('score.new', updateScore)
   .on('score.update', updateScore)
   .on('score.delete', deleteScore)
   .on('reconnect', function(){
   loadTournament($scope.current_tournament.id);
   });

   // used within servers
   socket.on('event', listener);
   socket.emit('even', [data], callback);
   */
  function Socket($rootScope) {
    var scopes = {};

    this.emit = function() {
      var args = Array.prototype.slice.call(arguments);
      if (args.length <= 0)
        return;
      var responseHandler = args[args.length - 1];
      if (angular.isFunction(responseHandler)) {
        responseHandler = wrapHandler(responseHandler);
      } else {
        args.push(_.noop);
      }
      socket.emit.apply(socket, args);
      return this;
    };

    this.on = function(e, handler) {
      addListener(e, wrapHandler(handler));
      return this;
    };

    this.addScope = function(angular_scope) {
      var scope = new Scope(angular_scope.$id);

      angular_scope.$on('$destroy', function() {
        scope.clear();
      });

      return scope;
    };

    this.getScope = function(id) {
      if (scopes[id]) {
        return scopes[id];
      } else {
        return false;
      }
    };

    this.getSocket = function() {
      return socket;
    };


    /*
     *	Create scoped objects which correspond to controllers scopes
     *	this allows us to easily remove events for a controllers scope when it gets destroyed
     */
    function Scope(id) {
      this.id = id;
      this.events = {};
      scopes[id] = this;
    }

    Scope.prototype.on = function(e, handler) {
      if (this.events[e] == undefined) {
        this.events[e] = [];
      }
      var wrapped_handler = wrapHandler(handler);
      this.events[e].push(wrapped_handler);
      addListener(e, wrapped_handler);
      return this;
    };

    Scope.prototype.clear = function() {
      // loop through all of our events and removeListener
      var keys = Object.keys(this.events);
      for(var i = 0; i < keys.length; ++i) {
        var e        = keys[i],
            handlers = this.events[e];

        for(var j = 0; j < handlers.length; ++j) {
          socket.removeListener(e, handlers[j]);
        }
      }
    };

    /*
     *	Since we can remove things now we have to be able to have a reference to the actual function
     *	since we have to use $rootScope.apply to bring the functions into "Angular Land" we can't just
     *	use the bare handler, so this function will wrap the supplied handler with the proper Angular
     *	code and return that function, which can be stored and used with removeListener
     */
    function wrapHandler(handler) {
      return function() {
        var args = arguments;
        $rootScope.$apply(function() {
          handler.apply(null, args);
        });
      }
    }

    /*
     *	This actually adds the event listener to the socket. Make sure the handler has already been
     *	wraped using the wrapHandler() function above
     */
    function addListener(e, wrapped_handler) {
      socket.on(e, wrapped_handler);
    }
  }

  servicesApp.service('socket', ['$rootScope', Socket]);


  // finally return our promise from above so we can trigger things to happen once we are connected
  return defer.promise;

}
