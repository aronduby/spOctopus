(function() {
  'use strict';

  angular.module('dibs')
    .directive('dibsSettings', settings);

  settings.$inject = ['environments', 'hiddenEnvironments', 'getOffset'];
  function settings(environments, hiddenEnvironments, getOffset) {
    return {
      restrict: 'E',
      templateUrl: 'dibs/settings/tmpl.settings.html',
      scope: {},
      controller: settingsCtrl,
      controllerAs: '$ctrl',
      bindToController: true,
      link: link
    };

    function settingsCtrl() {
      var self = this;

      this.environments = environments.all;
      this.checked = {};

      this.nameFilter = nameFilter;
      this.sync = sync;
      this.hideAll = hideAll;
      this.showAll = showAll;
      
      createChecked();
      
      function createChecked() {
        _.forEach(self.environments, function(env) {
          self.checked[env.Id] = !isHidden(env.Id);
        });
      }

      function nameFilter(q) {
        return function(item) {
          return !q || _.includes(item.Name.toUpperCase(), q.toUpperCase());
        }
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

    function link(scope, el, attrs) {
      var popup = el.find('section');

      el.on('mouseenter', function() {
        var offset = getOffset(el[0]);
        popup.css('bottom', offset.height + 'px');
      });
    }
  }

})();