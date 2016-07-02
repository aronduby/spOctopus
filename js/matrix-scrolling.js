(function() {

  /**
   * Turn vertical scroll wheel into horizontal for the table scrollers
   */

  var scrollSelector = '.matrix-container .overflow-scroll';

  $(document).on('mousewheel', scrollSelector, handleScroll);

  function handleScroll(e) {
    this.scrollLeft -= e.originalEvent.wheelDelta;
    e.preventDefault();
  }

})();