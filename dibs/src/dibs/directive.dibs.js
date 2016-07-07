(function() {
  'use strict';

  angular.module('dibs')
    .directive('dibs', directive);

  directive.$inject = ['environments', 'currentUser'];
  function directive(environments, currentUser) {
    return {
      templateUrl: 'dibs/tmpl.dibs.html',
      controller: ctrl,
      controllerAs: '$ctrl',
      link: link
    };

    function ctrl() {
      console.log(currentUser);
      this.environments = environments.all;
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