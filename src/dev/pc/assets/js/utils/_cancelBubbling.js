//上位要素へのイベント伝播を抑制する
function cancelBubbling(e) {
	if(e.stopPropagation) {
		e.stopPropagation();
	} else if(window.event) {
		window.event.cancelBubble = true;
	}
}
