// アコーディオン
window.addEventListener('DOMContentLoaded', function(){
  let w = window.innerWidth;
  const x = 992;
  if (w <= x) {
// 992px以下のときの処理
$(function(){
//.accordion_oneの中の.accordion_headerがクリックされたら
$('.js-accordion-title').click(function(){
//クリックされた.accordion_oneの中の.accordion_headerに隣接する.accordion_innerが開いたり閉じたりする。
$(this).next('.accordion__content').toggleClass('is-open');
$(this).toggleClass('is-active');
//クリックされた.accordion_oneの中の.accordion_header以外の.accordion_oneの中の.accordion_headerに隣接する.accordion_oneの中の.accordion_innerを閉じる
$('.js-accordion-title').not($(this)).next('.accordion__content').removeClass('is-open');
$('.js-accordion-title').not($(this)).removeClass('is-active');
});
});
$(function(){
//.accordion_oneの中の.accordion_headerがクリックされたら
$('li').click(function(){
//クリックされた.accordion_oneの中の.accordion_header以外の.accordion_oneの中の.accordion_headerに隣接する.accordion_oneの中の.accordion_innerを閉じる
$('.js-accordion-title').not($(this)).next('.accordion__content').removeClass('is-open');
$('.js-accordion-title').not($(this)).removeClass('is-active');
});
});
} else {
// 922px以上のときの処理
}});

