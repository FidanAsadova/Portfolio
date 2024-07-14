let BASE_URL = "http://localhost:8090/users";
let row = document.querySelector(".childres-all");
let sort = document.querySelector(".sort");
let search = document.querySelector("#search");
let bool = false;

function drawCildrens(arr) {
  row.innerHTML = "";
  arr.forEach((element) => {
    row.innerHTML += `
    <span class="col col-sm-12 col-md-6 col-lg-4 mb-5">
                <div class="child card pb-3">
                <img class="w-100" src="${element.img}" alt="">
                    <div class="p-3">
                    <p><b>${element.title}</b></p>
                    <p>${element.age} yrs</p>
                    </div>
                    <div class= "p-3">
                    <a class="btn btn-danger" onclick="deleteChild(${element.id},this)">Delete</a>
                    <a href="addChild.html?id=${element.id}" class="btn btn-primary" >Edit</a>
                    <a href="#" class="btn btn-success" onclick="favChild(${element.id})">Favorite</a>
                    </div>
                </div>
            </span>
    `;
  });
}

async function getData() {
  let res = await axios.get(BASE_URL);
  let data = await res.data;
  console.log(data);
  drawCildrens(data);
}
getData();

sort.addEventListener("click", async function () {
  let res = await axios.get(BASE_URL);
  let data = await res.data;
  let sorted;
  if (!bool) {
    sorted = data.sort((a, b) => a.age - b.age);
  } else {
    sorted = data.sort((a, b) => b.age - a.age);
  }
  drawCildrens(sorted);
  bool = !bool;
});

async function deleteChild(id, btn) {
  console.log(id);
  await axios.delete(`${BASE_URL}/${id}`);
  btn.closest("span").remove();
}

async function favChild(userId) {
  const res = await axios(`${BASE_URL}/${userId}`);
  const obj = await res.data;
  await axios.post("http://localhost:8090/fav", obj);
}
// favChild()

search.addEventListener("input", async function (e) {
  let res = await axios.get(BASE_URL);
  let data = await res.data;
  const searchName = data.filter((item) => {
    return `${item.title}`
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase());
  });
  drawCildrens(searchName);
});
