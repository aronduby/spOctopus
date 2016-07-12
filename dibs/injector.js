(function() {
  'use strict';

  var octopusLoaded = false;
  var socketLoaded = false;
  var appRoot = null;
  var nonBinding = null;

  var scripts = ['dibs/loader.js'];
  scripts.forEach(function(path) {
    var s = document.createElement('script');
    s.src = chrome.extension.getURL(path);
    (document.head || document.documentElement).appendChild(s);
    s.onload = function() {
      s.parentNode.removeChild(s);
    };
  });

  window.addEventListener("message", setupDOM, false);
  prepareSocket().then(setupSocket);

  function setupDOM(event) {
    if(event.source != window)
      return;

    window.spOctopus = event.data;

    window.name = "NG_DEFER_BOOTSTRAP!" + window.name;

    // Create a non-bindable wrapper for the root element
    // to keep the page's Angular instance away
    nonBinding = document.createElement('div');
    nonBinding.dataset.ngNonBindable = '';

    // Create the app's root element (everything else should go in here)
    appRoot = document.createElement('div');
    appRoot.dataset.ngApp = 'dibs';
    appRoot.className = 'dibs--app';

    // var dibs = document.createElement('dibs');
    // var dibsLoading = document.createTextNode('Loading - if this never goes away something is wrong');
    // dibs.appendChild(dibsLoading);
    // appRoot.appendChild(dibs);
    var view = document.createElement('div');
    view.setAttribute('ui-view', '');
    appRoot.appendChild(view);
    nonBinding.appendChild(appRoot);

    octopusLoaded = true;
    bootstrap();
  }

  function setupSocket(socket) {
    socketLoaded = true;
    bootstrap();
  }

  function bootstrap() {
    if (octopusLoaded && socketLoaded) {
      /* Manually bootstrap the Angular app */
      document.body.appendChild(nonBinding);
      window.name = '';   // To allow `bootstrap()` to continue normally
      angular.bootstrap(appRoot, ['dibs']);
    }
  }

})();