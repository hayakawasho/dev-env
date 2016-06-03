/////////////////////////////////////////////////////
//$(selector) → document.querySelectorAll(selector)
/////////////////////////////////////////////////////
// jQuery
var $el = $('.foo');
console.log($el.length);
console.log($el[0]);
// DOM
var els = document.querySelectorAll('.foo');
console.log(els.length);
console.log(els[0]);
// DOM（一件のみ）
var el = document.querySelector('.foo');
console.log(el);

/////////////////////////////////////////////////////
//find() → querySelectorAll()
/////////////////////////////////////////////////////
// jQuery
var $el = $('.foo');
console.log($el.find('.bar'));
// DOM
var els = document.querySelectorAll('.foo');
console.log(els[0].querySelectorAll('.bar'));

/////////////////////////////////////////////////////
//each() → Array.prototype.forEach()
/////////////////////////////////////////////////////
// jQuery
var $el = $('.foo');
$el.each(function(index, el) {
    console.log(index, el);
});
// DOM
var els = document.querySelectorAll('.foo');
Array.prototype.forEach.call(els, (el, index) => {
    console.log(index, el);
});

/////////////////////////////////////////////////////
//on() → addEventListener()
//複数件を対象にイベント監視する場合はArray.prototype.forEach() を使用
/////////////////////////////////////////////////////
// jQuery
var $el = $('.foo');
$el.on('click', function(event) {
    console.log(event.type);
});
// DOM
var els = document.querySelectorAll('.foo');
els[0].addEventListener('click', (event) => {
    console.log(event.type);
});

/////////////////////////////////////////////////////
// addClass() → classList.add()
/////////////////////////////////////////////////////
// jQuery
var $el = $('.foo');
$el.addClass('is-active');
// DOM
var els = document.querySelectorAll('.foo');
els[0].classList.add('is-active');

/////////////////////////////////////////////////////
// removeClass() → classList.remove()
/////////////////////////////////////////////////////
// jQuery
var $el = $('.foo');
$el.removeClass('is-active');
// DOM
var els = document.querySelectorAll('.foo');
els[0].classList.remove('is-active');

/////////////////////////////////////////////////////
// toggleClass() → classList.toggle()
// cf) 要素のクラスリスト中の特定のクラスの切替
/////////////////////////////////////////////////////
// jQuery
var $el = $('.foo');
$el.toggleClass('is-active');
// DOM
var els = document.querySelectorAll('.foo');
els[0].classList.toggle('is-active');

/////////////////////////////////////////////////////
//　hasClass() → classList.contains()
//　cf) String.contains→文字列に引数で指定した文字列が含まれるか判定するメソッド
// indexOf() で文字列が含まれるかどうか検索
/////////////////////////////////////////////////////
// jQuery
var $el = $('.foo');
$el.hasClass('is-active');
// DOM
var els = document.querySelectorAll('.foo');
els[0].classList.contains('is-active');

/////////////////////////////////////////////////////
//css() → style 、 getComputedStyle();
/////////////////////////////////////////////////////
// jQuery
var $el = $('.foo');
$el.css({
    color: 'red',
    width: 200
});
console.log($el.css('color'));
// DOM
var els = document.querySelectorAll('.foo');
els[0].style.color = 'red';
els[0].style.width = '200px';
console.log(getComputedStyle(els[0]).color);
