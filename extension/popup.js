

var elt = document.createElement("script");
elt.innerHTML = "window.postMessage({ type: \"FROM_PAGE\", extension_popup_clicked:  new Date().getTime() }, \"*\");"
document.head.appendChild(elt);
