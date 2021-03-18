const displayButtons = current_url => {
  document.querySelectorAll('.grid-view-item__image-container')
    .forEach(e => {
      fetch('http://kbpartpicker-api-dev.herokuapp.com/products/get_product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          vendor_url: current_url.replace(/\?.+/, ''),  // remove parameters
          product_url: e.getAttribute("href")
        })
      })
        .then(response => response.json())
        .then(data => {
          switch(data.status) {
            case "Not Supported":
              e.style.border = "2px solid black"
              break;
            case "Not Found":
              e.style.border = "2px solid red"
              break;
            case "Found":
              e.style.border = "2px solid green"
              break;
          }
        })
        .catch(error => console.log(error));
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
