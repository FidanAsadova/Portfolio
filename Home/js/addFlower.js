let id = new URLSearchParams(window.location.search).get("id");
let BASE_URL = "http://localhost:8070/flower";
let form = document.querySelector("form");
let img = document.querySelector("#img");
let flowername = document.querySelector("#flowername");
let price = document.querySelector("#price");
let titleForm = document.querySelector(".title-flower");
let btn = document.querySelector(".btn-primary");


async function getDataById() {
  let res = await axios.get(`${BASE_URL}/${id}`);
  let data = await res.data;
  console.log(data);
  console.log(id);
  img.value = data.img;
  flowername.value = data.name;
  price.value = data.price;
}
getDataById();  

function formTitle() {
  if (id) {
    titleForm.innerText = "Edit Flower";
    btn.innerText = "Edit";
  } else {
    titleForm.innerText = "Add Flower";
  }
}
formTitle();




function createdFlower() {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    let obj = {
      img: img.value,
      name: flowername.value,
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
createdFlower();
