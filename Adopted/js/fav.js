let BASE_URL = "http://localhost:8090/fav";
let allCards = document.querySelector(".allCards");
let btn = document.querySelector(".btn-primary");

async function getData() {
  let res = await axios.get(BASE_URL);
  let data = await res.data;
  console.log(data);
  drawFav(data);
  btn.addEventListener("click", function () {
    window.location.href = "index.html";
  });
}
getData();

function drawFav(arr) {
  allCards.innerHTML = "";
  arr.forEach((element) => {
    allCards.innerHTML += `
    <span class="col col-sm-12 col-md-6 col-lg-4 pt-5 pb-5">
            <div class="card">
              <img src="${element.img}" class="card-img-top" alt="" />
              <div class="card-body">
                <p class="card-title"><b>${element.title}</b></p>
                <p class="card-age">${element.age} yrs.</p>
                <a href="" class="btn btn-danger" onclick="deleteFav(${element.id}, this)">Remove</a>
              </div>
            </div>
          </span>`;
  });
}

// drawFav()

async function deleteFav(id, btn) {
  await axios.delete(`${BASE_URL}/${id}`);
  btn.closest("span").remove();
}
