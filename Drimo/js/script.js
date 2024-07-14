let BASE_URL = "http://localhost:8080/users";
let cards = document.querySelector(".cards");
let bool = false;
let sort = document.querySelector(".sort");
let seacrh = document.querySelector("#search");

function drawCards(arr) {
  cards.innerHTML = "";
  arr.forEach((element) => {
    cards.innerHTML += `
        <span class="col col-12 col-sm-6 col-lg-4 mb-4 mx-0">
              <div class="card">
                <img
                  src="${element.img}"
                  class="card-img-top"
                  alt="card foto"
                />
                <div class="card-body">
                  <p class="card-text">${element.title}</p>
                  <p class="card-text">${element.body}
                  </p>
                  <p class="price">$ ${element.price}</p>
                  <button class="btn btn-danger"  onclick="deleteCard(${element.id},this)">Delete</button>
                  <button  class="btn btn-success" onclick= favCard(${element.id})>Add Favorite</button>
                  <a href="addCard.html?id=${element.id}"  class="btn btn-primary" onclick= editCard(${element.id})>Edit</a>
                </div>
              </div>
            </span>
        `;
  });
}
// drawCards()

async function getData() {
  let res = await axios.get(BASE_URL);
  let data = await res.data;
  console.log(data);
  drawCards(data);
}
getData();

async function deleteCard(id, btn) {
  console.log(id);
  await axios.delete(`${BASE_URL}/${id}`);
  btn.closest("span").remove();
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
  drawCards(sorted);
  bool = !bool;
});

seacrh.addEventListener("input", async function (e) {
  let res = await axios.get(BASE_URL);
  let data = await res.data;
  const searchName = data.filter((item) => {
    return `${item.title}`
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase());
  });
  drawCards(searchName);
});

async function favCard(favId) {
  let res = await axios.get(`${BASE_URL}/${favId}`);
  let obj = await res.data;
  await axios.post("http://localhost:8080/fav", obj);
}
favCard()