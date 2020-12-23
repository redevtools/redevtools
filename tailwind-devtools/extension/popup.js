

var elt = document.createElement("script");
elt.innerHTML = "window.postMessage({ type: \"FROM_PAGE\", enabled:  true }, \"*\");"
document.head.appendChild(elt);
