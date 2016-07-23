(function() {

  /**
   * Turn vertical scroll wheel into horizontal for the table scrollers
   */
  var enabled = false;
  var scrollSelector = '.matrix-container .overflow-scroll td';

  chrome.storage.sync.get('enableScrollMapping', function(data) {
    if (data.enableScrollMapping !== false) {
      enableScrollMapping();
    }
  });

  chrome.storage.onChanged.addListener(function(changes, namespace) {
    var change = changes['enableScrollMapping'];
    if (change && change.newValue !== change.oldValue) {
      if (change.newValue && enabled === false) {
        enableScrollMapping();
      } else if (change.newValue === false && enabled === true) {
        disableScrollMapping();
      }
    }
  });

  function enableScrollMapping() {
    $(document).on('mousewheel', scrollSelector, handleScroll);
    enabled = true;
  }

  function disableScrollMapping() {
    $(document).off('mousewheel', scrollSelector, handleScroll);
    enabled = false;
  }

  function handleScroll(e) {
    $(this).parents('.overflow-scroll')[0].scrollLeft -= e.originalEvent.wheelDelta;
    e.preventDefault();
  }

})();