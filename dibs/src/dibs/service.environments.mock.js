(function() {
  'use strict';

  angular.module('dibs')
    .service('environmentsServiceMock', environments);

  function environments() {
    this.all = [
      {
        id: "Environments-201",
        name: "Frontend_1",
        dibs : {
          full: true,
          name: "Brenda",
          description: "ts-3907"
        },
        projects: [
          {
            id: "Projects-2",
            name: "TestApiServer",
            dibs : {
              full: true,
              name: "Brenda",
              description: "ts-3907"
            }
          },
          {
            id: "Projects-3",
            name: "TestAuthServer",
            dibs : {
              full: true,
              name: "Brenda",
              description: "ts-3907"
            }
          },
          {
            id: "Projects-41",
            name: "TestPosServer",
            dibs : {
              full: true,
              name: "Brenda",
              description: "ts-3907"
            }
          },
          {
            id: "Projects-4",
            name: "TestWebServer",
            dibs : {
              full: true,
              name: "Brenda",
              description: "ts-3907"
            }
          }
        ]
      },
      {
        id: 'Environments-202',
        name: 'Frontend_2',
        dibs: false,
        projects: [
          {
            id: "Projects-2",
            name: "TestApiServer",
            dibs : false
          },
          {
            id: "Projects-3",
            name: "TestAuthServer",
            dibs : false
          },
          {
            id: "Projects-4",
            name: "TestWebServer",
            dibs : false
          }
        ]
      },
      {
        id: "Environments-203",
        name: "Frontend_3",
        dibs: {
          full: false
        },
        projects: [
          {
            id: "Projects-2",
            name: "TestApiServer",
            dibs : {
              full: true,
              name: "Austin",
              description: "Dropship"
            }
          },
          {
            id: "Projects-3",
            name: "TestAuthServer",
            dibs : {
              full: true,
              name: "Austin",
              description: "Dropship"
            }
          },
          {
            id: "Projects-4",
            name: "TestWebServer",
            dibs : false
          }
        ]
      }
    ]
  }

})();