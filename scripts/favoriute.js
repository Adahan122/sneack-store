// function fetchData(api) {
//   return fetch(api)
//     .then((response) => response.json())
//     .then((data) => data.filter((sneaker) => sneaker.isLike === true))
//     .catch((error) => console.error(("Ошибка исправь", error)));
// }

// function renderSneakers(data) {
//   let wrapper = document.querySelector(".searches-crosses");
//   wrapper.innerHTML = data
//     .map((item) => {
//       return `
//     <div class="searches__item-crosses">
//             <div class="searches__item-crosses-like">
//               <img class="searches__item-crosses-like-img" src="/images/like-1.svg" data-sneaker-id='${item.id}' data-fav-id='-1'  alt="">
//             </div>
//             <a href="#"><img class="searches__item-img" src="/images/${item.imageUrl}" alt="" /></a>
//             <div class="searches__text">
//               <h3 class="searches__main-title">
//                 ${item.title}
//               </h3>
//             </div>
//             <div class="searches-price-text">
//               <div class="searches-price-box">
//                 <h5 class="searche-sevent-title">Цена:</h5>
//                 <p class="searches-price-subtitle" price>${item.price}</p>
//               </div>
//               <div class="searches-price-tick">
//                 <img  class="searches-plus-img" yes-price src="/img/+.svg" alt="">
//               </div>
//             </div>
//           </div>
//     `;
//     })
//     .join("");
// }

// let nameInput = document.getElementById("name");
// let passwordInput = document.getElementById("password");
// let btn = document.getElementById("submit");

// btn.addEventListener("click", function () {
//   let nameValue = nameInput.value;
//   let passwordValue = passwordInput.value;

//   let data = {
//     name: nameValue,
//     password: passwordValue,
//   };

//   return fetch("https://27193aec625dd99b.mokky.dev/favorites", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//     .then((response) => response.json())
//     .catch((err) => console.log(err));
// });

// fetchData("https://27193aec625dd99b.mokky.dev/sneakers")
//   .then((filteredData) => renderSneakers(filteredData))
//   .catch((error) => {
//     console.log(error);
//   });

function fetchData(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.filter((sneaker) => sneaker.isLike === true))
    .catch((error) => console.error("У тебя ошибка, исправляй", error));
}

function renderSneakers(data) {
  let wrapper = document.querySelector(".searches-crosses");
  wrapper.innerHTML = data
    .map((item) => {
      return `
    <div class="searches__item-crosses">
            <div class="searches__item-crosses-like">
              <img class="searches__item-crosses-like-img card-like" src="../images/like-2.svg" data-sneaker-id='${
                item.id
              }' data-is-like='${item.islike ? "true" : "false"}'  alt="">
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

fetchData("https://27193aec625dd99b.mokky.dev/sneakers")
  .then((filteredData) => renderSneakers(filteredData))
  .catch((error) =>
    console.error("Произошла ошибка при получении и отображении данных:", error)
  );
