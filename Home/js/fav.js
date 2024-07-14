let BASE_URL = "http://localhost:8070/fav";
let fav = document.querySelector(".fav-js");
let btn = document.querySelector(".btn-primary");

async function getData() {
  let res = await axios.get(BASE_URL);
  let data = await res.data;
  flowers(data);
  btn.addEventListener("click", function () {
    window.location.href = "index.html";
  });
}
getData();

function flowers(arr) {
  fav.innerHTML = "";
  arr.forEach((element) => {
    fav.innerHTML += `
        <span class="mb-3 mt-3 col col-sm-12 col-md-6 col-lg-4">
        <div class="flower border rounded-2">
          <img class="w-100 pb-3" src="${element.img}" alt="" />
          <p class="flower-name text-center">${element.name}</p>
          <p class="flower-price text-center">$ ${element.price}</p>
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
