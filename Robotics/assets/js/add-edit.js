let id = new URLSearchParams(window.location.search).get("id");
let BASE_URL = "https://northwind.vercel.app/api/suppliers";
let form = document.querySelector("form");
let robotTitle = document.querySelector("#robot-title");
let robotBody = document.querySelector("#robot-body");
let formTitle = document.querySelector(".title-robot");
let btn = document.querySelector(".btn-primary");


async function getDataById() {
    let res = await axios.get(`${BASE_URL}/${id}`);
    let data = await res.data;
    console.log(data);
    console.log(id);
    robotTitle.value = data.companyName;
    robotBody.value = data.contactTitle;
  }
  getDataById();
  
  function formtitle() {
    if (id) {
      formTitle.innerText = "Edit Card";
      btn.innerText = "Edit";
    } else {
      formTitle.innerText = "Add Card";
    }
  }
  formtitle();
  
  function createdRobots() {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      let obj = {
        companyName: robotTitle.value,
        contactName: robotBody.value,
      };
      if (id) {
        await axios.patch(`${BASE_URL}/${id}`, obj);
        window.location.href = "index.html";
      } else {
        await axios.post(BASE_URL, obj);
        window.location.href = "index.html";
      }
    });
  }
  createdRobots();
