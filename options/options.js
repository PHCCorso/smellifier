function saveOptions(e) {
    browser.storage.sync.set({
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
  
    let setting = browser.storage.sync.get("smellify");
    setting.then(setCurrentChoice, onError);
  }
  
  document.addEventListener("DOMContentLoaded", restoreOptions);
  document.querySelector('input[name="smellify"]').addEventListener("click", saveOptions);
  