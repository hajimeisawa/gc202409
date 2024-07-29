/** 1ページの商品カウント */
var PAGE_ITEM_COUNT = 30;
/** 1回に表示するページ数 */
var DISPLAY_PAGE_COUNT = 5;

/** 現在ページ */
var currentPage = 1;
/** 商品リスト */
var products = undefined;
/** 現在の対象商品リスト */
var searchResultProducts = [];
/** 現在のタイトル */
var currentTitle = '';
/** 初回描画用 */
var isInitial = true;

(function () {
    products = productsData.products;
    initialDisplay();
}());

/**
 * 初期表示
 */
function initialDisplay() {
    largeCategorySearch(1);
    if ($('.pc').css('display') == 'none') {
        $('.online-store').css('z-index', '-1');
    }
}

/**
 * BOX_ITEMSの再描画
 * @param {String} clickTarget クリックイベント発火クラス(スマホ版のみ使用)
 */
function invalidBoxItems(clickTarget) {
    $('#list').empty();
    appendTitleNode();
    selectionCurrentPageProducts();
    if (isInitial) {
        isInitial = false;
        return;
    }
    var waitTime = 0;
    if (clickTarget && clickTarget != '') {
        $(clickTarget).click();
        waitTime = 400;
    }
    // スムーススクロール
    setTimeout(function () {
        // スクロールの速度
        var speed = 400; // ミリ秒
        // 移動先を数値で取得
        var position = $('#list').offset().top;
        if ($('#gnavi01').css('display') != 'none') {
            position -= $('#gnavi01').height()+56;
        }else {
            position -= $('#header_nav').height();
        }
        $('body,html').animate({ scrollTop: position }, speed, 'swing');
    }, waitTime);
}

/**
 * タイトルノード追加
 */
function appendTitleNode() {
    var node = '';
    node += '<div class="breadcrumb" style="padding-bottom: 10px;padding-left: 32px;">';
    node += '  <a href="javascript:void(0)">' + currentTitle + '</a>&nbsp;&nbsp;対象商品一覧';
    node += '</div>';
    $('#box_items').append(node);
}

/**
 * 大カテゴリー検索
 * @param {Number} largeCategoryIndex 検索カテゴリー
 */
function largeCategorySearch(largeCategoryIndex) {
    searchResultProducts = [];
    currentPage = 1;
    if (largeCategoryIndex == 1) {
        currentTitle = 'ヘルスケア商品';
    } else if (largeCategoryIndex == 2) {
        currentTitle = '日用品';
    } else if (largeCategoryIndex == 3) {
        currentTitle = 'ビューティーケア用品';
    } else if (largeCategoryIndex == 4) {
        currentTitle = '食品';
    }

    products.forEach(function (row) {
        if (row.large_category_index == largeCategoryIndex) {
            searchResultProducts.push(row);
        }
    });
    invalidBoxItems('');
}

/**
 * 詳細カテゴリー検索
 * @param {Node} element 検索ノード
 * @param {String} clickTarget クリックイベント発火クラス(スマホ版のみ使用)
 */
function categorySearch(element, clickTarget) {
    searchResultProducts = [];
    currentPage = 1;
    currentTitle = $(element).data('category-name');
    var parts = $(element).data('category-code').split('-');
    var searchLargeCategoryIndex = parts[0];
    var searchCategoryCode = parts[1];
    products.forEach(function (row) {
        if (row.large_category_index == searchLargeCategoryIndex && row.category_code == searchCategoryCode) {
            searchResultProducts.push(row);
        }
    });
    invalidBoxItems(clickTarget);
}

/**
 * キーワード検索
 * @param {Node} element 検索ノード
 */

function keywordSearch(element) {
    searchResultProducts = [];
    currentPage = 1;
    var keyword = $(element).prev().val();
    currentTitle = keyword;
    products.forEach(function (row) {
        if (keyword != productsData.wordParition && row.search_word.indexOf(keyword) >= 0) {
            searchResultProducts.push(row);
        }
    });
    invalidBoxItems('');
}
let text_form = document.getElementById('keyword_txt');
text_form.addEventListener('keypress', keywordSearch);

/**
 * ページ遷移
 * @param {Number} 遷移先ページ
 * @returns false
 */
function screenTransition(page) {
    currentPage = page;
    invalidBoxItems('')
    return false;
}

/**
 * 現在ページの商品選定
 */
function selectionCurrentPageProducts() {
    var beginIndex = (currentPage - 1) * PAGE_ITEM_COUNT;
    var displayProducts = [];
    for (var i = beginIndex; i < beginIndex + PAGE_ITEM_COUNT && i < searchResultProducts.length; i++) {
        displayProducts.push(searchResultProducts[i]);
    }
    displayList(displayProducts);
}

/**
 * 描画処理
 * @param {Array} displayProducts 表示商品リスト
 * @returns void
 */
function displayList(displayProducts) {
    var beforeCategory = '';
    var beforeDetailCategpry = -1;
    var appendNode = '';
    var anchorCount = 0;
    var displayDetailTitle = {};

    displayProducts.forEach(function (product) {
        if (product.display_category != beforeCategory) {
            if (beforeCategory != '') {
                appendNode += '</div><!-- item-list -->';
            }
            appendNode += '<h2>' + product.display_category + '</h2>';
            beforeCategory = product.display_category;
            beforeDetailCategpry = -1;
        }
        if (product.product_type != beforeDetailCategpry) {
            anchorCount++;
            if (beforeDetailCategpry != -1) {
                appendNode += '</div><!-- item-list -->';
            }
            displayDetailTitle[anchorCount] = productsData.detail_title[product.product_type];
            appendNode += '<h3>' + productsData.detail_title[product.product_type] + '</h3>';
            appendNode += '<div class="item-list">';
            beforeDetailCategpry = product.product_type;
        }
        appendNode += makeProductNode(product);
    });
    appendNode += '</div><!-- item-list -->';
    appendNode += makePagenationNode();

    $('#list').append(appendNode);
}

/**
 * 商品ノード作成
 * @param {JSON} product 商品情報
 * @returns 商品ノード
 */
function makeProductNode(product) {
    var productNode = '';
    productNode += '<div class="item">';
    productNode += '  <div class="left">';
    productNode += '    ' + product.maker + '<br/>' + product.product_name + '<br/>' + product.standard;
    if (product.is_web_entry_type) {
        productNode += '<img class="mkpb" src="img/icon-mkoriginal.png" width="150" height="150" alt="マツキヨオリジナル">';
    }
    productNode += '    <img src="img/list-coupon/' + product.price_img + '" alt="税込価格から' + product.discount_one + product.price_alt + '" width="400" heigth="200">';
    productNode += '  </div>' // left;
    productNode += '  <div class="right">';
    if (product.photo_image == 1) {
        productNode += '<img class="product" src="img/list-product/' + product.jancode + '.jpg" width="400" height="350" alt="対象商品">';
    }
    productNode += '    <div class="cart-category">';
    if (product.url) {
        productNode += '  <a class="cart" href="' + product.url + '" target="_blank">';
        productNode += '    <img src="img/icon-tryangle-right-black.svg" width="142" height="256" alt="右矢印">';
        productNode += '    <img src="img/icon-cart-black.svg" width="256" height="181" alt="カートアイコン">';
        productNode += '  </a>';
    }
    productNode += '      ' + product.category_image;
    productNode += '    </div>'; // cart-category
    productNode += '  </div>'; // right
    productNode += '</div>'; // item

    return productNode;
}

/**
 * ページャーノード作成
 * @returns ページャーノード
 */
function makePagenationNode() {
    var node = '';
    var minimum = 1;
    var maximum = Math.ceil(searchResultProducts.length / PAGE_ITEM_COUNT);
    if (currentPage + 2 > maximum && maximum - DISPLAY_PAGE_COUNT + 1 > minimum) {
        // 「現在ページ + 表示ページ数」が最大値より多い かつ
        // 「最大値 - 表示ページ数」が0より大きい場合
        // 最大値 - 表示ページ数 を下限にする
        minimum = maximum - DISPLAY_PAGE_COUNT + 1;
    } else if (currentPage - 2 > minimum) {
        // 「現在ページ - 2」が最小値より大きい場合は「現在ページ - 2」を下限にする
        minimum = currentPage - 2;
    }
    if (maximum < DISPLAY_PAGE_COUNT) {
        // 最大値が表示ページ数より少ない場合、何もしない
    } else if (currentPage + 2 < DISPLAY_PAGE_COUNT) {
        // 「現在ページ + 2」が表示ページ数より少ない場合は、表示ページ数を上限にする
        maximum = DISPLAY_PAGE_COUNT;
    } else if (currentPage + 2 < maximum) {
        // 「現在ページ + 2」が最大値より小さい場合は「現在ページ + 2」を上限にする
        maximum = currentPage + 2;
    }

    node += '<div class="pagenation">';
    node += '  <ul>';
    if (currentPage > 1) {
        node += '    <li><a href="javascript:void(0)" onclick="screenTransition(' + (currentPage - 1) + ')">&larr;...</a></li>';
    } else {
        node += '    <li></li>';
    }

    for (var i = minimum; i <= maximum; i++) {
        node += '    <li><a href="javascript:void(0)" onclick="screenTransition(' + i + ')">' + i + '</a></li>';
    }

    if (currentPage < maximum) {
        node += '    <li><a href="javascript:void(0)" onclick="screenTransition(' + (currentPage + 1) + ')">...&rarr;</a></li>';
    } else {
        node += '    <li></li>';

    }
    node += '  </ul>';
    node += '</div>';

    return node;
}

// sp版メニュー

const menu = document.getElementById('search_button');
const nav = document.getElementById('product-category');
const accordion = document.getElementById('accordion_section');
window.addEventListener('DOMContentLoaded', function(){
if (window.matchMedia('(min-width: 992px)').matches) {
// ウィンドウサイズ992px以下のときの処理
menu.addEventListener('click', function(){
    accordion.classList.add('accordion_section-isopen');
});
document.getElementById('tolist').addEventListener('click', function(){
    accordion.classList.remove('accordion_section-isopen');
});
document.getElementById('accordion__content01').classList.add('is-open');
document.getElementById('accordion__content02').classList.add('is-open');
document.getElementById('accordion__content03').classList.add('is-open');
document.getElementById('accordion__content04').classList.add('is-open');

document.getElementById('tolist').addEventListener('click', function(){
    accordion.classList.remove('accordion_section-isopen');
});
document.getElementById('accordion__content01').addEventListener('click', function(){
    accordion.classList.remove('accordion_section-isopen');
});
document.getElementById('accordion__content02').addEventListener('click', function(){
    accordion.classList.remove('accordion_section-isopen');
});
document.getElementById('accordion__content03').addEventListener('click', function(){
    accordion.classList.remove('accordion_section-isopen');
});
document.getElementById('accordion__content04').addEventListener('click', function(){
    accordion.classList.remove('accordion_section-isopen');
});
  } else {
// それ以外の処理
menu.addEventListener('click', function(){
    accordion.classList.add('accordion_section-isopen');
});
document.getElementById('tolist').addEventListener('click', function(){
    accordion.classList.remove('accordion_section-isopen');
});
document.getElementById('accordion__content01').addEventListener('click', function(){
    accordion.classList.remove('accordion_section-isopen');
});
document.getElementById('accordion__content02').addEventListener('click', function(){
    accordion.classList.remove('accordion_section-isopen');
});
document.getElementById('accordion__content03').addEventListener('click', function(){
    accordion.classList.remove('accordion_section-isopen');
});
document.getElementById('accordion__content04').addEventListener('click', function(){
    accordion.classList.remove('accordion_section-isopen');
});
}});
