
// 残り入力項目の表示-------------
$(function () {
  var total = $("#apply_form").find(".hissu").length; //入力必須項目の合計の数
  $("#required_number").html(total);

  var i = 0;
  $(".required_number").html(total - i);
  var check = function () {
    i = 0;
    $("#apply_form").find("select").each(function () {
      if ($(this).val() !== "") {
        i++;
      }
    });
    $("#apply_form").find("input[type=\"tel\"],input[type=\"text\"]").each(function () {
      if ($(this).val() !== "") {
        i++;
      }
    });
    $(".required_number").html(total - i);
  };

  $("#apply_form").find("select, input[type=\"option\"]").change(function () {
    check();
  });
  $("#apply_form").find("input[type=\"tel\"],input[type=\"text\"]").keyup(function () {
    check();
  });
});

// 背景の色を変える-------------
$(".hissu").on('keydown keyup keypress change focus blur', function() {
if ($(this).val() == '') {
$(this).addClass("bkon");
} else {
$(this).removeClass("bkon"); /* 入力済みの背景色 */
}
}).change();
// プレゼントの選択（判定）
$("input[name=\"present\"]").click(function () {
  if($(this).prop('checked')){
  $(".present").addClass("bkwhite");
}else{
	$(".present").removeClass("bkwhite");
}
});
// このキャンペーンを知ったきっかけ（判定）
$("input[name=\"trigger\"]").click(function () {
  if($("input[name=\"trigger\"]:checked").length > 0){
  $(".trigger").addClass("bkwhite");
} else {
	$(".trigger").removeClass("bkwhite");
}
});
// メールアドレス（判定）
$("input[name=\"email-type\"]").click(function () {
  if($(this).prop('checked')){
  $(".email-type").addClass("bkwhite");
}else{
	$(".email-type").removeClass("bkwhite");
}
});
$(function () {
  //クリックで動く
  $('.present_agree_hissu').click(function () {
    $('.present_agreement').toggleClass('display_block');
  });
});
$("input[name=\"present_agreement\"]").click(function () {
  if($(this).prop('checked')){
  $(".present_agreement").addClass("bkwhite");
}else{
	$(".present_agreement").removeClass("bkwhite");
}
});



$(document).ready(function () {
  //radioボタンのname属性choiceをクリックしたら
  $("input[name='present']").click(function () {
    //変数valueにcheckedされたradioボタンのvalue値を取得する
    value = $("input[name='present']:checked").val();
    switch (value) {
      case 'マツキヨココカラポイント':
        $(".birthday, .mkpointnum").on('keydown keyup keypress change focus blur', function() {
          if ($(this).val() == '') {
          $(this).addClass('bkon y');
          $('.dpointnum').removeClass("bkon y");
          } else {
            $(this).removeClass('bkon y'); /* 入力済みの背景色 */
          }}).change();
        break;
      case 'dポイント':
        $(".dpointnum").on('keydown keyup keypress change focus blur', function() {
          if ($(this).val() == '') {
          $(this).addClass('bkon y');
          $(".birthday").removeClass('bkon y');
          $(".mkpointnum").removeClass('bkon y');
          } else {
            $(this).removeClass('bkon y'); /* 入力済みの背景色 */
          }
          }).change();
        break;
        default:
        $('.present_agreement').removeClass('display_block');
        $('.birthday').removeClass('bkon y');
        $('.mkpointnum').removeClass('bkon y');
        $('.dpointnum').removeClass("bkon y");
    }
  });
});


// 同意の判定
$("input[name=\"agree\"]").click(function () {
  if($(this).prop('checked', true)){
  $(".agree").addClass("bkwhite");
}else{
	$(".agree").removeClass("bkwhite");
}
});


// 全角半角変換
$(".hankaku").blur(function(){
  changeZen($(this));
});

changeZen = function(ele){
  var val = ele.val();
  var han = val.replace( /[Ａ-Ｚａ-ｚ０-９－！”＃＄％＆’（）＝＜＞，．？＿［］｛｝＠＾～￥]/g, function(s){return String.fromCharCode(s.charCodeAt(0) - 65248)});
  $(ele).val(han);
}