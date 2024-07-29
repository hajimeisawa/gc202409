// 賞品スライド
var swiper = new Swiper(".PresentSwiper", {
  loop: true,
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 4500,
    disableOnInteraction: true,
  },
});

// ピックアップ商品スライド
{
  var swiper = new Swiper('.PickupSwiper', {
    slidesPerView: 3,
    spaceBetween: 4,
    centeredSlides: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    loop: true,
    speed: 4000,
    autoplay: {
      delay: 500,
      disableOnInteraction: true,
    },
  });
}