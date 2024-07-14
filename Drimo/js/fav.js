let BASE_URL = "http://localhost:8080/fav";
let allFavCards = document.querySelector(".favCard");
let btn = document.querySelector(".btn-primary");

async function getData() {
  let res = await axios.get(BASE_URL);
  let data = await res.data;
  favCards(data);
  btn.addEventListener("click", function () {
    window.location.href = "index.html";
  });
}
getData();

function favCards(arr) {
  allFavCards.innerHTML = "";
  arr.forEach((element) => {
    allFavCards.innerHTML += `
        <span class=" col col-sm-12 col-lg-3 p-2">
            <div class="card">
              <img src="${element.img}" class="card-img-top" alt="card" />
              <div class="card-body">
                <p class="card-title">${element.title}</p>
                <hr>
                <p class="card-body">${element.body}</p>
                <p class="card-price">$ ${element.price}</p>
                <a class="btn btn-primary" onclick="removeFav(${element.id},this)">Remove</a>
              </div>
            </div>
          </span>
        `;
  });
}

async function removeFav(id, btn) {
  await axios.delete(`${BASE_URL}/${id}`);
  btn.closest("span").remove();
}
