var TouchEvent = (function(window) {
	var _instance;
	var _div;
	var _cancelReport;

	function TouchEvent(divID) {
		_instance = this;
		_div = document.getElementById(divID);
		if("ontouchstart" in window) {
			_div.addEventListener("touchstart", touchHandler, false);
			_div.addEventListener("touchmove", touchHandler, false);
			document.addEventListener("touchend", touchHandler, false);
			document.addEventListener("touchcancel", touchHandler, false);
		}
	}

	function touchHandler(e) {
		e.stopPropagation();
		switch(e.type) {
			case "touchstart":
				if(_cancelReport) {
					_div.removeChild(_cancelReport);
					_cancelReport = null;
				}
			case "touchmove":
				var touches = e.touches;
				var l = touches.length;
				for(var i = 0; i < l; ++i) {
					var touch = touches[i];
					var p = getParagraph(touch.identifier);
					var html = createHTML(e.type, touch);
					p.innerHTML = html;
				}
				break;
			case "touchcancel":
				if(!_cancelReport) {
					_cancelReport = document.createElement("p");
					_cancelReport.setAttribute("id", "cancel");
					_cancelReport.innerHTML = "touchcancel";
					_div.appendChild(_cancelReport);
				}
			case "touchend":
				var touches = e.changedTouches;
				var l = touches.length;
				for(var i = 0; i < l; ++i) {
					var touch = touches[i];
					removeParagraph(touch.identifier);
				}
				break;
		}
	}

	function getParagraph(identifier) {
		var id = "p" + identifier;
		var p = document.getElementById(id);
		if(!p) {
			p = document.createElement("p");
			p.setAttribute("id", id);
			_div.appendChild(p);
		}
		return p;
	}

	function removeParagraph(identifier) {
		var id = "p" + identifier;
		var p = document.getElementById(id);
		if(p) {
			_div.removeChild(p);
		}
	}

	function createHTML(type, touch) {
		var html = "type:" + type + BR;
		html += "identifier:" + touch.identifier + BR;
		html += "target:" + touch.target + BR;
		html += "screenX:" + touch.screenX + BR;
		html += "screenY:" + touch.screenY + BR;
		html += "pageX:" + touch.pageX + BR;
		html += "pageY:" + touch.pageY + BR;
		html += "clientX:" + touch.clientX + BR;
		html += "clientY:" + touch.clientY + BR;
		html += HR;
		return html;
	}
	return TouchEvent;
}(window));
window.addEventListener("load", function(e) {
	window.removeEventListener("load", arguments.callee, false);
	var sample = new TouchEvent("wrapper");
}, false);



// 方向
$(function() {
	$("div#touch").bind("touchstart", onTouchStart);
	$("div#touch").bind("touchmove", onTouchMove);
	$("div#touch").bind("touchend", onTouchEnd);
	var direction, position;

	//スワイプ開始時の横方向の座標を格納
	function onTouchStart(event) {
	    position = getPosition(event);
	}

	//スワイプの方向（left／right）を取得
	function onTouchMove(event) {
		direction = (position > getPosition(event)) ? "left" : "right";
	}

	//スワイプ終了時に方向（left／right）をクラス名に指定
	function onTouchEnd(event) {
		$("div#touch").removeAttr("class").addClass(direction);
	}

	//横方向の座標を取得
	function getPosition(event) {
		return event.originalEvent.touches[0].pageX;
	}
});
