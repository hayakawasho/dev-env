function toggleClassElement($element,$toggleClassName) {
	const target = document.getElementById($element);
   target.classList.toggle($toggleClassName);
   //console.log($toggleClassName);
}
var menuEvement = document.getElementById("js-menu");
menuEvement.onclick = function() {
    toggleClassElement("js-menu", "is-active");
};
var menuEvement = document.getElementById("js-menu2");
menuEvement.onclick = function() {
   toggleClassElement("js-menu2", "is-active");
};
