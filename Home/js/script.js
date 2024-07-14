let BASE_URL = "http://localhost:8070/flower";
let flowers = document.querySelector(".flower-js");
let search = document.querySelector("#search");
let sort = document.querySelector(".sort");
let bool = false;

async function getData() {
  let res = await axios.get(BASE_URL);
  let data = res.data;
  console.log(data);
  drawFlowers(data);
}
getData();

function drawFlowers(arr) {
  flowers.innerHTML = "";
  arr.forEach((element) => {
    flowers.innerHTML += `
    <span class="col col-sm-12 col-md-6 col-lg-4">
              <div class="flower mb-5 border">
                <img class="w-100 pb-3" src="${element.img}" alt="" />
                <p class="flower-name text-center">${element.name}</p>
                <p class="flower-price text-center">$ ${element.price}</p>
               <div class="btns p-3">
                <a href="" class="btn btn-danger" onclick="deleteFlower(${element.id}, this)">Delete</a>
                <a href="addFlower.html?id=${element.id}" class="btn btn-primary">Edit</a>
                <a href="#" class="btn btn-success" onclick="favFlower(${element.id})">Favorite</a>
            </div>
              </div>
            </span>
    `;
  });
}

async function deleteFlower(id, btn) {
  await axios.delete(`${BASE_URL}/${id}`);
  btn.closest("span").remove();
}

search.addEventListener("input", async function (e) {
  let res = await axios.get(BASE_URL);
  let data = await res.data;
  const searchName = data.filter((item) => {
    return `${item.name}`
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase());
  });
  drawFlowers(searchName);
});

sort.addEventListener("click", async function () {
  let res = await axios.get(BASE_URL);
  let data = res.data;
  let sorted;
  if (!bool) {
    sorted = data.sort((a, b) => a.price - b.price);
  } else {
    sorted = data.sort((a, b) => b.price - a.price);
  }
  drawFlowers(sorted);
  bool = !bool;
});

async function favFlower(favId) {
  let res = await axios.get(`${BASE_URL}/${favId}`);
  let obj = await res.data;
  await axios.post("http://localhost:8070/fav", obj)
}
