(function() {
  'use strict';

  angular.module('dibs')
    .directive('dibsSettings', settings);

  settings.$inject = ['environments', 'hiddenEnvironments'];
  function settings(environments, hiddenEnvironments) {
    return {
      restrict: 'E',
      templateUrl: 'dibs/settings/tmpl.settings.html',
      scope: {},
      controller: settingsCtrl,
      controllerAs: '$ctrl',
      bindToController: true
    };

    function settingsCtrl() {
      var self = this;

      this.environments = environments.all;
      this.checked = {};

      this.sync = sync;
      this.hideAll = hideAll;
      this.showAll = showAll;
      
      createChecked();
      
      function createChecked() {
        _.forEach(self.environments, function(env) {
          self.checked[env.Id] = !isHidden(env.Id);
        });
      }

      function isHidden(envId) {
        return _.indexOf(hiddenEnvironments.hidden, envId) >= 0;
      }

      function sync(checked, envId) {
        if (checked) {
          _.remove(hiddenEnvironments.hidden, function(id) {
            return id == envId;
          });
        } else {
          hiddenEnvironments.hidden.push(envId);
        }
      }

      function hideAll() {
        hiddenEnvironments.hidden = _.map(self.environments, 'Id');
        createChecked();
      }

      function showAll() {
        hiddenEnvironments.hidden = [];
        createChecked();
      }
    }
  }

})();