(function() {
  'use strict';

  angular.module(Octopus.App.name)
    .run(function() {
      var repository = new Octopus.Client.Repository(Octopus.App.Client);
      repository.Dashboards.getDashboard()
        .then(function(rsp){
          window.postMessage({
            dashboard: rsp,
            user: Octopus.App.currentUser
          }, "*");
        })
    });

})();