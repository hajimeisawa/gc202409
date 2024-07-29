{
  // フォーム開始位置でプログレスバー表示

  // 座標を取得したい要素のidを指定
  var targetElement = document.getElementById( "apply" ) ;
  // 要素の位置座標を取得
  var applyclientRect = targetElement.getBoundingClientRect() ;
  // ページの上端から要素の上端までの距離
  var applyy = window.pageYOffset + applyclientRect.top ;

  // フォーム開始位置までスクロールしたらプログレスバー表示
  const pageTop = document.getElementById('progress');
  pageTop.removeAttribute('href'); //href属性削除
  window.addEventListener('scroll', function(){
    let topY = window.pageYOffset;
    if(topY > applyy){
      pageTop.className = 'progress-show';
    } else{
      pageTop.className = 'progress-hide';
    }
  });
}

{
  // 賞品選択位置でプログレスバー切り替え

  var targetElement = document.getElementById( "present" ) ;
  var presentclientRect = targetElement.getBoundingClientRect() ;
  var presenty = window.pageYOffset + presentclientRect.top ;

  const pageTop = document.getElementById('present-pro');
  window.addEventListener('scroll', function(){
    let topY = window.pageYOffset + 130;
    if(topY > presenty){
      pageTop.className = 'on';
    } else{
      pageTop.className = 'off';
    }
  });
}

{
  // 個人情報位置でプログレスバー切り替え

  var targetElement = document.getElementById( "personal" ) ;
  var personalclientRect = targetElement.getBoundingClientRect() ;
  var personaly = window.pageYOffset + personalclientRect.top ;

  const pageTop = document.getElementById('personal-pro');
  window.addEventListener('scroll', function(){
    let topY = window.pageYOffset + 130;
    if(topY > personaly){
      pageTop.className = 'on';
    } else{
      pageTop.className = 'off';
    }
  });
}

{
  // 個人情報位置でプログレスバー切り替え

  var targetElement = document.getElementById( "questionnaire" ) ;
  var questionnaireclientRect = targetElement.getBoundingClientRect() ;
  var questionnairey = window.pageYOffset + questionnaireclientRect.top ;

  const pageTop = document.getElementById('questionnaire-pro');
  window.addEventListener('scroll', function(){
    let topY = window.pageYOffset + 130;
    if(topY > questionnairey){
      pageTop.className = 'on';
    } else{
      pageTop.className = 'off';
    }
  });
}