let elScrollable;
if (navigator.userAgent.indexOf('WebKit') < 0) {
   //for other browser
    elScrollable = document.documentElement;
} else {
   //for WebKit
    elScrollable = document.body;
}
function getWidth() {
    let windowgWidth = elScrollable.scrollWidth;
}
