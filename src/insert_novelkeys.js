const displayButtons = current_url => {
  document.querySelectorAll('.product-single__title')
    .forEach(e => {
      e.style.border = "2px solid red"
    })
};

const addCDNs = () => {
  const iconCdn =
    '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>';
  const fontCdn =
    '<link href="https://fonts.googleapis.com/css?family=Baloo+Da+2&display=swap" rel="stylesheet"></link>';
  const cdns = [iconCdn, fontCdn];
  cdns.forEach(cdn =>
    document.querySelector("head").insertAdjacentHTML("beforeend", cdn)
  );
};

const activate = ({ activate, current_url }) => {
  if (activate) {
    addCDNs();
    displayButtons(current_url);
  } else {
    return
  }
};

chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((msg) => {
    chrome.storage.local.set({
      activated: msg.activate
    })
    activate(msg);
  });
  window.addEventListener('beforeunload', () => {
    chrome.storage.local.set({
      activated: false
    })
    port.postMessage({refreshed: true})
  })
});
