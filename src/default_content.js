// const displayButtons = (selector, vendor_url) => {
//   document.querySelectorAll(selector)
//     .forEach(e => {
//       fetch('http://kbpartpicker-api-dev.herokuapp.com/products/get_product', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           vendor_url: vendor_url,
//           product_url: e.getAttribute("href")
//         })
//       })
//         .then(response => response.json())
//         .then(data => {
//           switch(data.status) {
//             case "Not Supported":
//               e.style.border = "2px solid black"
//               break;
//             case "Not Found":
//               e.style.border = "2px solid red"
//               break;
//             case "Found":
//               e.style.border = "2px solid green"
//               break;
//           }
//         })
//         .catch(error => console.log(error));
//     })
// };


const activate = ({ selector, vendor_url }) => {
  document.querySelectorAll(selector)
    .forEach(e => {
      fetch('http://kbpartpicker-api-dev.herokuapp.com/products/get_product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          vendor_url: vendor_url,
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

chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((msg) => {
    activate(msg);
    chrome.storage.local.set(msg)
  });
});
