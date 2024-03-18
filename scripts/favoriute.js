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
              <img class="searches__item-crosses-like-img" src="/images/like-1.svg" data-sneaker-id='${item.id}' data-fav-id='-1'  alt="">
            </div>
            <a href="#"><img class="searches__item-img" src="/images/${item.imageUrl}" alt="" /></a>
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

fetchData("https://5c782080f150df17.mokky.dev/items").then((data) => {
  renderSneakers(data);
});

let cardLike = document.querySelector(".searches__item-crosses-like-img");

function addLike(sneakerId) {
  return fetch("https://27193aec625dd99b.mokky.dev/favorites", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ID: sneakerId }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

function removeLike(likeId) {
  return fetch(`https://27193aec625dd99b.mokky.dev/favorites/${likeId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((err) => console.log(err));
}

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("searches__item-crosses-like-img")) {
    if (event.target.src === "http://127.0.0.1:5500/images/like-1.svg") {
      event.target.src = "http://127.0.0.1:5500/images/like-2.svg";

      const sneakerId = event.target.dataset.sneakerId;
      addLike(sneakerId).then((json) => (event.target.dataset.favId = json.id));
    } else {
      event.target.src = "http://127.0.0.1:5500/images/like-1.svg";
      const likeId = event.target.dataset.favId;
      removeLike(likeId);
    }
  }
});

// function postName() {
//  return fetch("https://27193aec625dd99b.mokky.dev/favorites", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ name: "Adahan" }),
//   })
//     .then((response) => response.json())
//     .catch((err) => console.log(err));
// }

// postName();

// function postName() {
//   return fetch("https://27193aec625dd99b.mokky.dev/favorites", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ name: "Adahan" }),
//   })
//     .then((response) => response.json())
//     .catch((err) => console.log(err));
// }

// postName();

// let nameInput = document.getElementById("name");
// let btn = document.getElementById("submit");

// btn.addEventListener("click", function () {
//   let nameValue = nameInput.value;
//   return fetch("https://27193aec625dd99b.mokky.dev/favorites", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ name: nameValue }),
//   })
//     .then((response) => response.json())
//     .catch((err) => console.log);
// });

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

function renderLikedSneaker(allSneakers) {
  let favimg = document.querySelectorAll(".searches-crosses");

  favimg.forEach((favimg) => {
    let sneakerId = favimg.dataset.sneakerId;
    if (allSneakers.some((sneaker) => sneaker.sneakerId === sneakerId)) {
      favimg.src = "../images/like-2.svg";
    }
  });
}

fetchData("https://5c782080f150df17.mokky.dev/items").then((data) => {
  renderSneakers(data);
  fetch("https://27193aec625dd99b.mokky.dev/favorites").then((response) => {
    response.json().then((data) => {
      renderLikedSneaker(data);

    });
  });
});

