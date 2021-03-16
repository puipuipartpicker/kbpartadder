window.addEventListener('load', (event) => {
  chrome.tabs.executeScript(null, {
    file: 'src/filter.js', }, () => {
      connect()
  });
});

const activate = document.querySelector('input');
const connect = () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const port = chrome.tabs.connect(tabs[0].id, {name: "activate"});
    activate.onclick = () => {
      port.postMessage({
        activate: activate.checked,
        current_url: tabs[0].url
      })
    }
    port.onMessage.addListener((msg) => {
      if (msg.refreshed) {
        activate.checked = false;
      }
      connect();
    })
    port.onDisconnect.addListener(() => {
      setTimeout(() => { connect(), 500 })
    })
    chrome.storage.local.get(['activated'], (state) => {
      activate.checked = state.activated
    })
  })
}
