// const numbers = [1, 2, 3, 4, 5];
// // console.log(numbers);
// numbers.forEach(function (number) {
//   console.log(number);
// });
const ticks = document.querySelectorAll(".searches-price-tick");

function searchesPriceTick() {
  ticks.forEach((tick) => {
    tick.addEventListener("click", function () {
      tick.classList.toggle("selected");
      // console.log(tick);
    });
  });
}
searchesPriceTick();

let userURL = "https://jsonplaceholder.typicode.com/users";
let postsURL = "https://jsonplaceholder.typicode.com/posts";
function getData(URL, method = "GET", body = null) {
  return fetch(URL, {
    method: method,
    body: body ? JSON.stringify(body) : null,
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return response.json().then((err) => {
      const e = new Error("У вас произошла маленькая ошибочка");
      e.data = err;
      throw e;
    });
  });
}
let sneackUrl = "https://5c782080f150df17.mokky.dev/items";
getData(sneackUrl).then((sneack) => {
  console.log(sneack);
});

function fetchData(api) {
  return fetch(api)
    .then((response) => response.json())
    .catch((error) => console.error(("Ошибка исправь", error)));
}
function renderSneakers(data) {
  let wrapper = document.querySelector(".searches-crosses");
  wrapper.innerHTML = data
    .map((item) => {
      return `
    <div class="searches__item-crosses">
            <div class="searches__item-crosses-like">
              <img class="searches__item-crosses-like-img card-like" src="/images/${
                item.islike ? "like-2.svg" : "like-1.svg"
              }" data-sneaker-id='${item.id}' data-is-like='${
        item.islike ? "true" : "false"
      }'  alt="">
            </div>
            <a href="#"><img class="searches__item-img" src="/images/${
              item.imageUrl
            }" alt="" /></a>
            <div class="searches__text">
              <h3 class="searches__main-title">
                ${item.title}
              </h3>
            </div>
            <div class="searches-price-text">
              <div class="searches-price-box">
                <h5 class="searche-sevent-title">Цена:</h5>
                <p class="searches-price-subtitle" price>${item.price}</p>
              </div>
              <div class="searches-price-tick">
                <img  class="searches-plus-img" yes-price src="/img/+.svg" alt="">
              </div>
            </div>
          </div>
    `;
    })
    .join("");
}

document.addEventListener("click", function (event) {
  let target = event.target;

  if (target.classList.contains("card-like")) {
    let sneakerId = target.dataset.sneakerId;
    let isLiked = target.dataset.isLiked === "true";
    fetch(`https://27193aec625dd99b.mokky.dev/sneakers/${sneakerId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ islike: !isLiked }),
    })
      .then((response) => response.json())
      .then((data) => {
        target.dataset.isLiked = String(!isLiked);
        target.setAttribute(
          "src",
          `${
            isLiked
              ? "http://127.0.0.1:5500/images/like-2.svg"
              : "http://127.0.0.1:5500/images/like-1.svg"
          }`
        );
      })
      .catch((error) => {
        console.log("Ошибка исправляй", error);
      });
  }
});

fetchData("https://27193aec625dd99b.mokky.dev/sneakers").then((data) => {
  renderSneakers(data);
});

let nameInput = document.getElementById("name");
let passwordInput = document.getElementById("password");
let btn = document.getElementById("submit");

btn.addEventListener("click", function () {
  let nameValue = nameInput.value;
  let passwordValue = passwordInput.value;

  let data = {
    name: nameValue,
    password: passwordValue,
  };

  return fetch("https://27193aec625dd99b.mokky.dev/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
});

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
