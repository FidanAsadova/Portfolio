let id = new URLSearchParams(window.location.search).get("id");
let BASE_URL = "http://localhost:8090/users";
let title = document.querySelector("#childname");
let age = document.querySelector("#age");
let img = document.querySelector("#img");
let form = document.querySelector("form");
let formTitle = document.querySelector("h1");
let btn = document.querySelector(".btn-primary");
let btnBack = document.querySelector(".btn-back");

async function getUserById() {
  let res = await axios(`${BASE_URL}/${id}`);
  let data = await res.data;
  console.log(data);
  title.value = data.title;
  age.value = data.age;
  img.value = data.img;
}
getUserById();

function titleForm() {
  if (id) {
    formTitle.innerText = "Edit Child";
    btn.innerText = "Edit";
  } else {
    formTitle.innerText = "Add Child";
    
  }
}
titleForm();

btnBack.addEventListener("click", function () {
  window.location.href = "index.html";
});

function createdChild() {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    let obj = {
      title: title.value,
      age: age.value,
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
createdChild();
