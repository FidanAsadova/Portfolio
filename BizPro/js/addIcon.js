let id = new URLSearchParams(window.location.search).get("id");
let BASE_URL = "http://localhost:8060/icon";
let form = document.querySelector("form");
let icontitle = document.querySelector("#icontitle");
let iconbody = document.querySelector("#iconbody");
let price = document.querySelector("#price");
let btn = document.querySelector(".btn-primary");
let titleForm = document.querySelector(".title-icon")

async function getDataById() {
  let res = await axios.get(`${BASE_URL}/${id}`);
  let data = await res.data;
  console.log(data);
  console.log(id);
  icontitle.value = data.title;
  iconbody.value = data.body;
  price.value = data.price;
}
getDataById();

function formtitle() {
  if (id) {
    titleForm.innerText = "Edit Card";
    btn.innerText = "Edit";
  } else {
    titleForm.innerText = "Add Card";
  }
}
formtitle();

function createdCards() {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    let obj = {
      title: icontitle.value,
      body: iconbody.value,
      price: price.value,
    };
    if (id) {
      await axios.patch(`${BASE_URL}/${id}`, obj);
      window.location.href = "index.html";
    } else {
      axios.post(BASE_URL, obj);
      window.location.href = "index.html";
    }
  });
}
createdCards();
