//イベントリスナを登録する
function removeListerner(elem, ev, listner) {
	if(elem.removeEventListener) {
		elem.removeEventListener(ev, listener, false);
	} else if(elem.detachEvent) {
		elem.detachEvent('on' + ev, listener);
	} else {
		throw new Error('イベントリスナに未対応です。');
	}
}
