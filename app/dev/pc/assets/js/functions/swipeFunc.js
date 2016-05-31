$(function() {
	// 移動する要素の親要素(スワイプ後の位置を確認するのに使用)
	var swWrap = $('#wrap');
	// 移動する要素
	var sw = swWrap.children('.box');
	var isTouch = ('ontouchstart' in window);
	// 初期位置
	var basePoint;
	// 移動する要素にイベントが発生した時
	sw.bind({
		// タッチ開始
		'touchstart mousedown': function(e) {
			e.preventDefault();
			// 画面の左端からの座標
			this.pageX = (isTouch ? event.changedTouches[0].pageX : e.pageX);
			// basePointとthis.leftに現在のleftの値(0)を追加
			basePoint = this.left = parseFloat($(this).css('left'));
			this.touched = true;
		},
		// タッチ中
		'touchmove mousemove': function(e) {
			if(!this.touched) {
				return;
			}
			e.preventDefault();
			// 移動要素のleftに入れる値
			this.left = parseFloat($(this).css('left')) - (this.pageX - (isTouch ? event.changedTouches[0].pageX : e.pageX));
			$(this).css({
				left: this.left
			});
			// 画面の左端からの座標
			this.pageX = (isTouch ? event.changedTouches[0].pageX : e.pageX);
		},
		// タッチ終了
		'touchend mouseup': function(e) {
			if(!this.touched) {
				return;
			}
			this.touched = false;
			// 移動要素が親要素の範囲より右にはみ出しているとき
			if(this.left > 0) {
				// 移動要素と親要素の左端を合わせる
				$(this).animate({
					left: 0
				}, 200);
				// 移動要素が親要素の範囲より左にはみ出しているとき
			} else if(this.left < swWrap.width() - sw.width()) {
				// 移動要素と親要素の右端を合わせる
				$(this).animate({
					left: swWrap.width() - sw.width()
				}, 200);
			} else {}
		}
	});
});

$(function() {
	/* タッチできる環境なら true、そうでないなら false 。ここで先に判別しておきます。 */
	var isTouch = ('ontouchstart' in window);
	// 移動する要素の親要素(スワイプ後の位置を確認するのに使用)
	var swWrap = $('#js-drawer-menu');
	// 移動する要素
	var sw = swWrap.children('.box');
	// 初期位置
	var basePoint;
	// 移動する要素にイベントが発生した時
	/* sw のイベントを jQuery.bind で捕獲します。 */
	$("#js-drawer-menu").bind({
		// タッチ開始
		'touchstart mousedown': function(e) {
			e.stopPropagation(); // ページが動いたり、反応を止める（A タグなど）
			// 開始位置 X,Y 座標を覚えておく
			// （touchmove イベントを通らず終了したときのために必ず覚えておくこと）
			this.pageX = (isTouch ? event.changedTouches[0].pageX : e.pageX);
			//this.pageX = (isTouch ? event.changedTouches[0].pageX : e.pageX); // X 座標の位置
			// basePointとthis.leftに現在のleftの値(0)を追加
			//basePoint = this.left = parseFloat($(this).css('left'));
			// 現在の hoge の場所を覚えておく
			//basePoint = this.left = $(this).position().left;
			// 初期位置
			basePoint = this.left = 0;
			console.log(basePoint);
			// タッチ処理を開始したフラグをたてる
			this.touched = true;
		},
		// タッチ中
		'touchmove mousemove': function(e) {
			// 開始していない場合は動かないようにする
			// 過剰動作の防止
			if(!this.touched) {
				return;
			}
			// ページが動くのを止める
			e.stopPropagation();
			// 移動先の hoge の位置を取得する
			// 移動要素のleftに入れる値
			this.left = this.left - (this.pageX - (isTouch ? event.changedTouches[0].pageX : e.pageX));
			//this.left = parseFloat($(this).css('left')) - (this.pageX - (isTouch ? event.changedTouches[0].pageX : e.pageX));
			if(this.left < 0) {
				return false;
			} else {
				$(this).css({
					right: -(this.left)
				});
				$("#js-drawer-close").css({
					right: swWrap.width() - this.left
				});
			}
			// 画面の左端からの座標
			this.pageX = (isTouch ? event.changedTouches[0].pageX : e.pageX);
			console.log(this.left);
		},
		// タッチ終了
		'touchend mouseup': function(e) {
			if(!this.touched) {
				return;
			}
			// タッチ処理は終了したため、フラグをたたむ
			this.touched = false;
			// 移動要素が親要素の範囲より右にはみ出しているとき
			if(this.left < swWrap.width() / 2) {
				// 移動要素と親要素の左端を合わせる
				$("#js-drawer-close").addClass('is-active');
				$("#js-drawer-open").addClass('is-active');
				$("#js-drawer-mask").addClass('is-active');
				$("#js-drawer-mask").addClass('is-active');
				$(this).animate({
					right: ""
				}, 200);
				$("#js-drawer-close").animate({
					right: swWrap.width()
				}, 200);
				// 移動要素が親要素の範囲より左にはみ出しているとき
			} else if(swWrap.width() / 2 < this.left) {
				// 移動要素と親要素の右端を合わせる
				$(this).removeClass('is-active');
				$("#js-drawer-close").removeClass('is-active');
				$("#js-drawer-open").removeClass('is-active');
				$("#js-drawer-mask").removeClass('is-active');
				$("#js-drawer-mask").removeClass('is-active');
				$(this).css({
					right: ""
				});
				$("#js-drawer-close").css({
					right: ""
				});
			}
		}
	});
});
