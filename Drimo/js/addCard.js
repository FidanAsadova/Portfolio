let id = new URLSearchParams(window.location.search).get("id");
let BASE_URL = "http://localhost:8080/users";
let cardtitle = document.querySelector("#cardtitle");
let cardbody = document.querySelector("#cardbody");
let price = document.querySelector("#price");
let img = document.querySelector("#img");
let form = document.querySelector("form");
let titleForm = document.querySelector(".title");
let btn = document.querySelector(".btn-primary");

async function getDataById() {
  let res = await axios.get(`${BASE_URL}/${id}`);
  let data = await res.data;
  console.log(data);
  console.log(id);
  cardtitle.value = data.title;
  cardbody.value = data.body;
  price.value = data.price;
  img.value = data.img;
}
getDataById();

function formTitle() {
  if (id) {
    titleForm.innerHTML = "Edit Card";
    btn.innerText = "Edit";
  } else {
    titleForm.innerHTML = "Add Card";
  }
}
formTitle();

function createdCard() {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    let obj = {
      title: cardtitle.value,
      body: cardbody.value,
      price: price.value,
      img: img.value,
    };
    if (id) {
      await axios.patch(`${BASE_URL}/${id}`, obj);
    } else {
      await axios.post(BASE_URL, obj);
    }
    window.location.href = "index.html";
  });
}
createdCard();
