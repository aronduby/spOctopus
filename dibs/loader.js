(function() {
  'use strict';

  window.name = "NG_DEFER_BOOTSTRAP!" + window.name;

  // Create a non-bindable wrapper for the root element
  // to keep the page's Angular instance away
  var div = document.createElement('div');
  div.dataset.ngNonBindable = '';

  // Create the app's root element (everything else should go in here)
  var appRoot = document.createElement('div');
  appRoot.dataset.ngApp = 'dibs';
  appRoot.className = 'dibs--app';

  var dibs = document.createElement('dibs');
  appRoot.appendChild(dibs);

  // Insert elements into the DOM
  document.body.appendChild(div);
  div.appendChild(appRoot);

  /* Manually bootstrap the Angular app */
  window.name = '';   // To allow `bootstrap()` to continue normally
  angular.bootstrap(appRoot, ['dibs']);
  console.log('Boot and loaded !');

  console.log(window.Octopus);

})();