(function() {
  'use strict';

  angular.module('dibs')
    .provider('environmentsMock', environmentsProvider);

  function environmentsProvider() {
    var dashboardData = null;
    this.setDashboardData = function(data) {
      dashboardData = data;
    };


    this.$get = function() {
      return new Environments();
    };
  }

  function Environments() {
    this.all = [
      {
        Id: "Environments-201",
        Name: "Frontend_1",
        Dibs : {
          Full: true,
          Name: "Brenda",
          Description: "ts-3907"
        },
        Items: [
          {
            Project: {
              Id: "Projects-2",
              Name: "TestApiServer"
            },
            Dibs : {
              Full: true,
              Name: "Brenda",
              Description: "ts-3907"
            }
          },
          {
            Project: {
              Id: "Projects-3",
              Name: "TestAuthServer"
            },
            Dibs : {
              Full: true,
              Name: "Brenda",
              Description: "ts-3907"
            }
          },
          {
            Project: {
              Id: "Projects-41",
              Name: "TestPosServer"
            },
            Dibs : {
              Full: true,
              Name: "Brenda",
              Description: "ts-3907"
            }
          },
          {
            Project: {
              Id: "Projects-4",
              Name: "TestWebServer"
            },
            Dibs : {
              Full: true,
              Name: "Brenda",
              Description: "ts-3907"
            }
          }
        ]
      },
      {
        Id: 'Environments-202',
        Name: 'Frontend_2',
        Dibs: false,
        Items: [
          {
            Project: {
              Id: "Projects-2",
              Name: "TestApiServer"
            },
            Dibs : false
          },
          {
            Project: {
              Id: "Projects-3",
              Name: "TestAuthServer"
            },
            Dibs : false
          },
          {
            Project: {
              Id: "Projects-4",
              Name: "TestWebServer"
            },
            Dibs : false
          }
        ]
      },
      {
        Id: "Environments-203",
        Name: "Frontend_3",
        Dibs: {
          Full: false
        },
        Items: [
          {
            Project: {
              Id: "Projects-2",
              Name: "TestApiServer"
            },
            Dibs : {
              Full: true,
              Name: "Austin",
              Description: "Dropship"
            }
          },
          {
            Project: {
              Id: "Projects-3",
              Name: "TestAuthServer",
            },
            Dibs : {
              Full: true,
              Name: "Austin",
              Description: "Dropship"
            }
          },
          {
            Project: {
              Id: "Projects-4",
              Name: "TestWebServer"
            },
            Dibs : false
          }
        ]
      }
    ]
  }

})();