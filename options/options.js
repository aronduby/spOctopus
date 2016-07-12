(function() {

  var dibsServer = document.getElementById('dibsServer');
  var save = document.getElementById('save');
  var saveMessage = document.getElementById('saveMessage');

  function validateServerUrl() {
    saveMessage.style.display = 'none';

    if (dibsServer.value.indexOf('https://') !== 0 &&
        dibsServer.value.indexOf('wss://') !== 0
    ) {
      dibsServer.classList.add('error');
      save.disabled = true;
    } else {
      dibsServer.classList.remove('error');
      save.disabled = false;
    }
  }

  function loadData() {
    chrome.storage.sync.get({
      dibsServer: 'https://localhost:789/dibs'
    }, function(items) {
      dibsServer.value = items.dibsServer;
    });
  }

  function saveData(e) {
    e.preventDefault();
    if (!dibsServer.classList.contains('error')) {
      chrome.storage.sync.set({
        dibsServer: dibsServer.value
      }, function() {
        saveMessage.style.display = 'block';
        save.disabled = true;
      });
    } else {
      alert('You must supply a secure url (https:// or wss://');
    }
  }

  document.addEventListener('DOMContentLoaded', loadData);
  save.addEventListener("click", saveData);
  dibsServer.addEventListener("input", validateServerUrl);

})();