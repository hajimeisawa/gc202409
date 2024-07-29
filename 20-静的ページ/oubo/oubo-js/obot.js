// モーダル関連の要素を取得
var modal = document.getElementById("myModal");
var btn = document.getElementById("obot_modal");
var span = document.getElementsByClassName("close")[0];
// var iframe = document.getElementById("displayFrame"); // iframeの要素を取得
var iframe_content = document.getElementById("displayFrame");
var iframe = document.getElementById("iframeContainer"); // iframeの要素を取得

// ボタンクリックでモーダルを開く
btn.onclick = function() {
  modal.style.display = "block";
}

// ×ボタンでモーダルを閉じる
span.onclick = function() {
  modal.style.display = "none";
  iframe.src = ""; // iframeを閉じる（srcを空にする）
}

// モーダル外のクリックでモーダルとiframeを閉じる
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    iframe_content.src = ""; // iframeを閉じる（srcを空にする）
  }
}

// 選択肢のボタンでiframeのsrcを変更
document.getElementById("option1").addEventListener("click", function() {
  iframe_content.src = "https://hosting-for-customers.obotai.com/v2/matukiyo-full/index.html";
  iframe.style.transform = "0.5s";
  iframe.style.display = "block";
  modal.style.display = "none";
});

document.getElementById("option2").addEventListener("click", function() {
  iframe_content.src = "https://hosting-for-customers.obotai.com/v2/kokokara-full/index.html";
  iframe.style.transform = "0.5s";
  iframe.style.display = "block";
  modal.style.display = "none";
});



document.getElementById("closeIframe").addEventListener("click", function() {
  // iframeを非表示にする
  document.getElementById("iframeContainer").style.display = "none";
});

document.getElementById("maximizeIframe").addEventListener("click", function() {
  var iframe = document.getElementById("displayFrame");
  var container = document.getElementById("iframeContainer");
  // 最大化と通常サイズの切り替え
  if (iframe.style.width == "100%") {
    iframe.style.width = "100vw";
    iframe.style.height = "100vh";
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.zIndex = "9999";
  } else {
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    container.style.position = "fixed";
    container.style.top = "initial";
    container.style.left = "initial";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.zIndex = "9999";
  }
});
