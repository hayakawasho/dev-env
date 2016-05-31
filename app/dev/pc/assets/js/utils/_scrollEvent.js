/////////////////////////////////////////////////////
//スクロールの監視
/////////////////////////////////////////////////////
$(window).on('scroll', (event) => {
    console.log('window');
});
/////////////////////////////////////////////////////
//スクロール位置の取得
//cf)document.documentElement→HTML要素の事
//document.documentElement.scrollTop→現在のスクロール位置
/////////////////////////////////////////////////////
let elScrollable;
if (navigator.userAgent.indexOf('WebKit') < 0) {
   //for other browser
    elScrollable = document.documentElement;
} else {
   //for WebKit
    elScrollable = document.body;
}
const scrollTop = elScrollable.scrollTop;
/////////////////////////////////////////////////////
// ページ最下部へのスクロール到達判定
// cf)「スクロール位置 + 画面高さ」＝「ページ高さ」→最下部
// clientHeight→height + padding
// scrollHeight→表示領域の高さが5行分のときに、内容が10行分あった場合、
// clientHeightは5行分（+パディング）を返すが、scrollHeightは10行分を返す。 
/////////////////////////////////////////////////////
//画面高さの取得
var windowHeight = document.documentElement.clientHeight;
//ページ高さの取得
var pageHeight = elScrollable.scrollHeight;
//判定
var marginBottom = 0;
if (scrollTop + windowHeight + marginBottom >= pageHeight) {
    // 到達！
}
