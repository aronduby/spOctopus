(function() {
  'use strict';

  angular.module('dibs')
    .provider('environments', environmentsProvider);

  function environmentsProvider() {
    var dashboardData = null;
    this.setDashboardData = function(data) {
      dashboardData = data;
    };

    this.$get = getter;
    getter.$inject = ['dibsService', 'socket'];
    function getter(dibsService, socket) {
      return new Environments(dashboardData, dibsService, socket);
    }

    function Environments(data, dibsService, socket) {
      var self = this;
      var items = [];

      this.all = [];

      socket.on('dibs.claimed', claim);
      socket.on('dibs.cleared', clear);

      init(data);

      function init(data){
        processData(data);
        dibsService.getAll()
          .then(getAllDibsHandler)
          .catch(err);
      }

      function processData(data) {
        self.all = data.Environments;

        _.forEach(data.Items, function(item) {
          var env = _.find(self.all, {Id: item.EnvironmentId});
          var project = _.find(data.Projects, {Id: item.ProjectId});

          if (!_.isArray(env.Items)) {
            env.Items = [];
          }

          item.Dibs = false;
          item.Project = project;
          item.Environment = env;
          env.Items.push(item);
          items.push(item);
        });
      }

      function getAllDibsHandler(dibs) {
        _.forEach(dibs, function(dib) {
          var item = _.find(items, _.pick(dib, ['EnvironmentId', 'ProjectId']));
          if (item) {
            item.Dibs = dib;
          }
        });

        _.forEach(self.all, setEnvDibs);
      }

      function claim(dibs) {
        _.forEach(dibs, function(dib) {
          var item = _(items).filter({'EnvironmentId': dib.EnvironmentId, 'ProjectId': dib.ProjectId}).head();
          if (item) {
            item.Dibs = dib;
            setEnvDibs(item.Environment);
          }
        });
      }

      function clear(dibs) {
        _.forEach(dibs, function(dib) {
          var item = _(items).filter(dib).head();
          if (item) {
            item.Dibs = false;
            setEnvDibs(item.Environment);
          }
        });
      }

      function setEnvDibs(env) {
        var dibs = _.map(env.Items, 'Dibs');

        // if all of the dibs are false, it's available
        if (_.every(dibs, function(dib) { return !dib; })) {
          env.Dibs = false;
        } else {
          var envDib = {};

          if (_.every(dibs)) {
            var descriptions = _(dibs).map('Description').uniq().value();
            if (descriptions.length > 1) {
              _.assign(envDib, {
                Full: true,
                Description: 'Multiple Dibs',
                Name: null
              });
            } else {
              _.assign(envDib, {
                Full: true,
                Description: descriptions[0],
                Name: dibs[0].Name
              });
            }
          } else {
            _.assign(envDib, {
              Full: false
            });
          }

          env.Dibs = envDib;
        }
      }

      function err(err) {
        console.error(err);
      }

    }


  }

})();