//イベントデフォルトの挙動を抑止する
function cancelEvent(e) {
	if(e.preventDefault) {
		e.preventDefault();
	} else if(window.event) {
		window.event.returnValue = false;
	}
}
