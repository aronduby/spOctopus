(function() {
  'use strict';

  angular.module('dibs')
    .provider('environments', environmentsProvider);

  function environmentsProvider() {
    var dashboardData = null;
    this.setDashboardData = function(data) {
      dashboardData = data;
      console.log(data);
    };

    // TODO will need socket at some point
    this.$get = function() {
      return new Environments(dashboardData);
    };

    function Environments(data) {
      var self = this;
      var items = [];

      this.all = [];


      init(data);

      function init(data){
        processData(data);
      }

      function processData(data) {
        self.all = data.Environments;

        _.forEach(data.Items, function(item) {
          var env = _.find(self.all, {Id: item.EnvironmentId});
          var project = _.find(data.Projects, {Id: item.ProjectId});

          if (!_.isArray(env.items)) {
            env.items = [];
          }

          item.dibs = false;
          item.project = project;
          env.items.push(item);
          items.push(item);
        });
      }

    }


  }

})();