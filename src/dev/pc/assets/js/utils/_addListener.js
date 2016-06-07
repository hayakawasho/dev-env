//イベントリスナを登録する
function addListerner(elem, ev, listner) {
	if(elem.addEventListener) {
		elem.addEventListener(ev, listener, false);
	} else if(elem.attachEvent) {
		elem.attachEvent('on' + ev, listener);
	} else {
		throw new Error('イベントリスナに未対応です。');
	}
}
