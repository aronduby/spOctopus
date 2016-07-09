(function() {
  'use strict';

  angular.module('dibs')
    .directive('dibs', directive);

  directive.$inject = ['environments', 'hiddenEnvironments'];
  function directive(environments, hiddenEnvironments) {
    return {
      templateUrl: 'dibs/tmpl.dibs.html',
      controller: ctrl,
      controllerAs: '$ctrl',
      link: link
    };

    function ctrl() {
      this.environments = environments.all;
      this.filterHidden = filterHidden;

      function filterHidden(env) {
        return !(_.indexOf(hiddenEnvironments.hidden, env.Id) >= 0);
      }
    }

    function link() {
      var scrollSelector = '.dibs-environments-holder';
      $(document).on('mousewheel', scrollSelector, handleScroll);
      function handleScroll(e) {
        this.scrollLeft -= e.originalEvent.wheelDelta;
        e.preventDefault();
      }
    }
  }
})();