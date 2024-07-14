let BASE_URL = "http://localhost:8060/icon";
let icons = document.querySelector(".icons");
let search = document.querySelector("#search");
let sort = document.querySelector(".sort");
let bool = false;

async function getData() {
  let res = await axios.get(BASE_URL);
  let data = await res.data;
  console.log(data);
  drawIcons(data);
}
getData();

function drawIcons(arr) {
  icons.innerHTML = "";
  arr.forEach((element) => {
    icons.innerHTML += `
        <span class="col col-sm-12 col-md-6 col-lg-3 mb-3">
              <div class="icon d-flex flex-column">
                <div class="img-div">
                    <img src="./img/image (1).png" alt="">
                </div>
                <p class="web title text-center">${element.title}</p>
                <p class="text-center price">$ ${element.price}</p>
                <p class=" body text-secondary text-center">${element.body}</p>
                <div class="btns d-flex flex-wrap gap-2">
                <button class="btn text-secondary border-danger rounded-0">
                  More Details
                </button>
                <a  href="addIcon.html?id=${element.id}" class="btn text-primary border-danger rounded-0" >Edit</a>
                <a href="#"  class="btn text-success border-danger rounded-0" onclick="favFunc(${element.id})" >Fav</a>
                <a  class="btn text-danger border-danger rounded-0" onclick="deleteIcon(${element.id},this)">Delete</a></div>
              </div>
            </span>
        `;
  });
}

sort.addEventListener("click", async function () {
  let res = await axios.get(BASE_URL);
  let data = await res.data;
  let sorted;
  if (!bool) {
    sorted = data.sort((a, b) => a.price - b.price);
  } else {
    sorted = data.sort((a, b) => b.price - a.price);
  }
  drawIcons(sorted);
  bool = !bool;
});

search.addEventListener("input", async function (e) {
  let res = await axios.get(BASE_URL);
  let data = await res.data;
  const searchName = data.filter((item) => {
    return `${item.title}`
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase());
  });
  drawIcons(searchName);
});

async function deleteIcon(id, btn) {
  await axios.delete(`${BASE_URL}/${id}`);
  btn.closest("span").remove()
}

async function favFunc(favId) {
    let res = await axios.get(`${BASE_URL}/${favId}`);
    let obj = await res.data;
    await axios.post("http://localhost:8060/fav", obj)
  }
favFunc()

