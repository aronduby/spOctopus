// (function() {

  var dibsServer = document.getElementById('dibsServer');
  var enableScrollMapping = document.getElementById('enableScrollMapping');
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
      dibsServer: 'https://grpl.info:789/dibs',
      enableScrollMapping: true
    }, function(items) {
      dibsServer.value = items.dibsServer;
      enableScrollMapping.checked = items.enableScrollMapping;
    });
  }

  function saveData(e) {
    e.preventDefault();
    if (!dibsServer.classList.contains('error')) {
      chrome.storage.sync.set({
        dibsServer: dibsServer.value,
        enableScrollMapping: enableScrollMapping.checked
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

// })();