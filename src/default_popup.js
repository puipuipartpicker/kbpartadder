window.addEventListener('load', (event) => {
  chrome.tabs.executeScript(null, {
    file: 'src/default_content.js', }, () => {
      connect()
  });
});

const confirm = document.getElementById('confirm');
const selector = document.getElementById('cards_selector');
const vendor_url = document.getElementById('vendor_url');
const connect = () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const port = chrome.tabs.connect(tabs[0].id, {name: "activate"});
    confirm.onclick = () => {
      port.postMessage({
        "selector": selector.value,
        "vendor_url": vendor_url.value
      })
    }
    // port.onMessage.addListener((msg) => {
    //   if (msg.refreshed) {
    //     activate.checked = false;
    //   }
    //   connect();
    // })
    // port.onDisconnect.addListener(() => {
    //   setTimeout(() => { connect(), 500 })
    // })
    chrome.storage.local.get(['selector'], (value) => {
      selector.value = value
    })
    chrome.storage.local.get(['vendor_url'], (value) => {
      vendor_url.value = value
    })
  })
}
