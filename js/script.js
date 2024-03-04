// const numbers = [1, 2, 3, 4, 5];
// // console.log(numbers);
// numbers.forEach(function (number) {
//   console.log(number);
// });

function searchesPriceTick() {
  const ticks = document.querySelectorAll(".searches-price-tick");
  ticks.forEach((tick) => {
    tick.addEventListener("click", function () {
      tick.classList.toggle("selected");
      console.log(tick);
    });
  });
}

searchesPriceTick();

let swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 1800,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
