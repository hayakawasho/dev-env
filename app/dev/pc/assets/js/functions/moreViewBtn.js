function MoreViewBtn($element, $value) {
	const target = document.getElementById($element);
	const items = target.getElementsByTagName("li");
	const len = items.length;
	const btnMoreClass = target.querySelector(".js-more");
	const btnCloseClass = target.querySelector(".js-close");
	//デフォルト表示数の制御
	btnCloseClass.style.display = "none";
	for(var i = 0; i < len; i = (i + 1) | 0) {
		//全要素数がデフォルト表示数より少なかったらボタンを隠す
		if(len <= $value) {
			btnMoreClass.style.display = "none";
		} else {
			btnMoreClass.style.display = "block";
			for(i = $value; i < len; i = (i + 1) | 0) {
				items[i].style.display = "none";
			}
		}
	}
	//クリック時の挙動
   let itemsVisible = $value;
	btnCloseClass.onclick = function() {
		this.style.display = "none";
		btnMoreClass.style.display = "block";
		for(i = $value; i < len; i = (i + 1) | 0) {
			items[i].style.display = "none";
		}
		return itemsVisible = $value; //デフォルト表示数にリセット
	};
	btnMoreClass.onclick = function() {
		itemsVisible += $value; // クリックごとに+$valueする
		for(i = $value; i < itemsVisible; i = (i + 1) | 0) {
			items[i].style.display = "block";
			//全要素数より表示させる要素が多くなったら、
			if(len <= itemsVisible) {
				this.style.display = "none";
				btnCloseClass.style.display = "block";
			}
		}
	};
}
//関数実行
window.addEventListener("load", () => {
	MoreViewBtn("js-more-view", 3);
}, false);
