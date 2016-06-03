function TabUI($this, $target) {
    const target = document.getElementById($target); //タブUIの大本取得
    const tabMenuClassName = target.getElementsByClassName("js-tab-menu");
    const tabContentsClassName = target.getElementsByClassName("js-tab-contents");

    for (i = 0, len = tabMenuClassName.length; i < len; i = (i + 1) | 0) {
        var tabMenuItem = tabMenuClassName[i].getElementsByTagName("li");
    }
    for (i = 0, len = tabContentsClassName.length; i < len; i = (i + 1) | 0) {
        var tabContentItem = tabContentsClassName[i].getElementsByClassName("js-tab-content");
    }
    //クリックしたタブがアクティブか調べる
    var flag = -1; //クリックしたタブ番号を兼ねたフラグ
    for (i = 0, len = tabMenuItem.length; i < len; i = (i + 1) | 0) {
        if (tabMenuItem[i] === $this.parentNode) {
            if (tabMenuItem[i].className.indexOf("is-active") < 0) {
                //クリックしたタブがアクティブでなければ何個目のタブかを取得
                var flag = i;
            }
        }
    }
    //タブ番号と等しいタブはis-active付与、そうでなければis-active除去
    function tabClickEvent($target) {
        for (i = 0, len = $target.length; i < len; i = (i + 1) | 0) {
            if (i === flag) {
                $target[i].className += " is-active";
            } else {
                $target[i].className = $target[i].className.replace("is-active", "");
            }
        }
    }
    //アクティブでないタブがクリックされていれば実行
    if (flag >= 0) {
        tabClickEvent(tabMenuItem);
        tabClickEvent(tabContentItem);
    }
}
// タブUI関数の実行
let tabSecter = document.getElementById("js-tab-nav");
let tabSecterChild = tabSecter.getElementsByTagName('span');
for (var i = 0, len = tabSecterChild.length; i < len; i = (i + 1) | 0) {
    tabSecterChild[i].onclick = function() {
        TabUI(this, 'js-tab');
    };
}
