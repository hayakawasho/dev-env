// getElementsByClassName →　"test"のclassを持つすべての要素を取得
var elements = document.getElementsByClassName("test");

// elementのclass名を取得
var element = document.getElementById("test");
console.log(element.className);

//id名を使ってul要素にあたる部分を取得
var list = document.getElementById("list__block");

//①childNodesで指定する場合
console.log("①childNodesで指定した結果はこちら↓↓↓");
console.log(list.childNodes);

//②childrenで指定する場合
console.log("②childrenで指定した結果はこちら↓↓↓");
console.log(list.children);

//h1タグ（id="hTitle"）の親要素を取得したい場合
var h = document.getElementById("hTitle");

console.log("parendNodeを使用した場合の結果はこちら↓↓");
console.log(h.parentNode);

console.log("祖先要素を取得したい場合はparentNodeを２回使います。↓↓");
console.log(h.parentNode.parentNode);


/*

メソッド名	できること	記載方法
appendChild（）	子要素の一番最後に新しく要素追加	element.appendchild(newElement)
insertBefore（）	指定された子要素の一つ前にに新しく要素追加	element.insertBefore(new,ref)
removeChild（）	（）の中で指定された子要素を削除	element.appendchild(newElement)
*/
