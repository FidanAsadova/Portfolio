let BASE_URL = "http://localhost:8060/fav";
let icons = document.querySelector(".fav-js");
let btn = document.querySelector(".btn-primary");

async function getData() {
  let res = await axios.get(BASE_URL);
  let data = await res.data;
  addIcon(data);
  btn.addEventListener("click", function () {
    window.location.href = "index.html";
  });
}
getData();

function addIcon(arr) {
  icons.innerHTML = "";
  arr.forEach((element) => {
    icons.innerHTML += `
        <span class="mb-3 mt-3 col col-sm-12 col-md-6 col-lg-4">
                <div class="icons border rounded-2 p-2">
                  <img class="w-100 p-5" src="./img/image (1).png" alt="" />
                  <p class="icon-title text-center">${element.title}</p>
                  <p class="icon-body text-center">${element.body}</p>
                  <p class="icon-price text-center">$ ${element.price}</p>
                  <a href="" class="btn btn-danger m-2" onclick="removeFav(${element.id},this)">Remove</a>
                </div>
              </span>
        `;
  });
}

async function removeFav(id, btn) {
  await axios.delete(`${BASE_URL}/${id}`);
  btn.closest("span").remove();
}
