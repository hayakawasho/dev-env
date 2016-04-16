function tabUI($this, $target) {
    const target = document.getElementById($target); //タブUIの大本取得
    const childs = target.getElementsByClassName("js-tab");
    for (i = 0; i < childs.length; i++) {
        const tabNav = childs[i].getElementsByTagName("li");
        const tabContents = childs[i].getElementsByClassName("js-tab-box");
    }
    //クリックしたタブがアクティブか調べる
    let flag = -1; //クリックしたタブ番号を兼ねたフラグ
    for (i = 0; i < tabNav.length; i++) {
        if (tabNav[i] === $this.parentNode) {
            if (tabNav[i].className.indexOf("is-active") < 0) {
                //クリックしたタブがアクティブでなければ何個目のタブかを取得
                let flag = i;
            }
        }
    }
    //タブ番号と等しいタブはis-active付与、そうでなければis-active除去
    function tabClick($target) {
        for (i = 0; i < $target.length; i++) {
            if (i === flag) {
                $target[i].className += " is-active";
            } else {
                $target[i].className = $target[i].className.replace("is-active", "");
            }
        }
    }
    //アクティブでないタブがクリックされていれば実行
    if (flag >= 0) {
        tabClick(tabNav);
        tabClick(tabContents);
    }
}
// タブ切り替え実行
let tabSelector = document.getElementById("js-tab-nav");
let tabSelectorChild = tabSelector.getElementsByTagName('a');
for (i = 0; i < tabSelectorChild.length; i++) {
    tabSelectorChild[i].addEventListener('click', () => {
        tabUI(this, 'js-tab-wrapper');
    }, false);
}
