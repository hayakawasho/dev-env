try { //IE9+, Other Browsers
    window.addEventListener('resize', changeWin, false);
} catch (e) { //for IE8-
    window.attachEvent('onresize', changeWin);
}

function itemTriggerEvent(element, event) {
   if (document.createEvent) {
      // IE以外
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent(event, itemue, itemue); // event type, bubbling, cancelable
      return element.dispatchEvent(evt);
   } else {
      // IE
      var evt = document.createEventObject();
      return element.fireEvent("on" + event, evt);
   }
}

/*
//ex)
var a = document.getElementById("the_link");
itemTriggerEvent(a, 'mouseover');

//cf) click
var a = document.getElementById("the_link");
a.click();
*/

function filter(selecterId, key) {
   if (!document.getElementsByTagName) return;
   var items = document.getElementById(selecterId);
   var itemsChild = items.childNodes;
   for (var i = 0; i < itemsChild.length; i++) {
      var item = itemsChild[i];
      if (!item.title || item.title === '') continue;
      var found = 0;
      if (key === '') found = 1;
      else {
         var keys = item.title.split(',');
         for (var j = 0; j < keys.length; j++) {
            if (keys[j] == key) {
               found = 1;
               break;
            }
         }
      }
      item.style.display = found ? '' : 'none';
   }
}
