let BASE_URL = "http://localhost:8080/products";
let BASE_URL_FAV = "http://localhost:8080/fav";
let boxes = document.querySelector(".boxes");
let bool = false;
let sort = document.querySelector(".sort");
let load = document.querySelector(".load-more");
let search = document.querySelector("#search");
let num = 4;

async function getData() {
  let res = await axios.get(BASE_URL);
  let data = res.data;
  console.log(data);
  console.log(id);
  drawBoxes(data);
}
getData();

function drawBoxes(arr) {
  boxes.innerHTML = "";
  arr.slice(0, num).forEach((element) => {
    boxes.innerHTML += `
        <span class="col col-sm-12 col-md-6 col-lg-3">
              <div class="item mb-5">
                <div class="item-img">
                  <img class="w-100" src="${element.img}" alt="" />
                  <div class="white-div pt-5 pb-5">
                    <div
                      class="primary-icons d-flex gap-4 justify-content-center"
                    >
                      <div class="icon-div bg-primary p-2">
                        <a href=""
                          ><i
                            class="fa-solid fa-magnifying-glass"
                            style="color: #ffffff"
                          ></i
                        ></a>
                      </div>
                      <div class="icon-div bg-primary p-2">
                        <a href=""
                          ><i
                            class="fa-solid fa-cart-shopping"
                            style="color: #ffffff"
                          ></i
                        ></a>
                      </div>
                      <div class="icon-div bg-primary p-2">
                        <a href=""
                          ><i
                            class="fa-regular fa-heart"
                            style="color: #ffffff"
                          ></i
                        ></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="item-bottom pt-4 d-flex flex-column align-items-center"
                >
                  <p class="item-title text-center text-secondary mb-0">
                    ${element.title}
                  </p>
                  <p class="item-body text-center fs-3 fw-normal mb-0">
                    ${element.body}
                  </p>
                  <p class="price text-center text-secondary fs-5 fw-bolder">
                    $ ${element.price}
                  </p>
                </div>
                <div class="btns">
                  <div class="row">
                    <div class="col col-6 d-flex flex-column gap-2">
                      <a href="edit-add.html?id=${element.id}" class="text-success">Edit</a>
                      <a href="details.html?id=${element.id}" class="text-warning">Details</a>
                    </div>
                    <div class="col col-6 d-flex flex-column gap-2">
                      <a class="text-danger" onclick="deleteBox(${element.id},this)">Delete</a>
                      <a class="text-primary" onclick="favBox(${element.id})">Favorite</a>
                    </div>
                  </div>
                </div>
              </div>
            </span>`;
  });
}

load.addEventListener("click", function (e) {
  e.preventDefault();
  num = num + 4;
  getData();
});

sort.addEventListener("click", async function (e) {
  e.preventDefault();
  let res = await axios.get(BASE_URL);
  let data = res.data;
  let sorted;
  if (!bool) {
    sorted = data.sort((a, b) => a.price - b.price);
  } else {
    sorted = data.sort((a, b) => b.price - a.price);
  }
  drawBoxes(sorted);
  bool = !bool;
});

search.addEventListener("input", async function (e) {
  let res = await axios.get(BASE_URL);
  let data = res.data;
  let filtered = data.filter((item) => {
    return `${item.body}`
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase());
  });
  drawBoxes(filtered);
});

async function deleteBox(id, btn) {
  await axios.delete(`${BASE_URL}/${id}`);
  btn.closest("span").remove();
}

async function favBox(id) {
  let res = await axios.get(`${BASE_URL}/${id}`);
  let obj = res.data;
  console.log(obj);
  await axios.post(BASE_URL_FAV, obj);
}
favBox();
