function saveOptions(e) {
    chrome.storage.sync.set({
      smellify: document.querySelector('input[name="smellify"]').checked
    });
  }
  
  function restoreOptions() {
  
    function setCurrentChoice(result) {
      if (result.smellify === undefined) {
        result.smellify = true;
      }

      document.querySelector('input[name="smellify"]').checked = result.smellify;
    }
  
    function onError(error) {
      console.log(`Error: ${error}`);
    }
  
    chrome.storage.sync.get(["smellify"], setCurrentChoice);
  }
  
  document.addEventListener("DOMContentLoaded", restoreOptions);
  document.querySelector('input[name="smellify"]').addEventListener("click", saveOptions);
  