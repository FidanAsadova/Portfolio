let cards = document.querySelector(".row");
let search = document.querySelector(".search");
let select = document.querySelector(".select");

let BASE_URL = "https://restcountries.com/v2/all";

axios(BASE_URL).then((res) => drawCountry(res.data));

function drawCountry(arr) {
  cards.innerHTML = "";

  arr.forEach((element) => {
    cards.innerHTML += `
  <div class="col col-sm-12 col-md-6 col-lg-3">
              <a href="./details.html?name=${element.name}">
                <div class="card m-2 vh-75" style="width: 15rem">
                <div class="img-div">
                <img src="${element.flags.svg}" class="card-img-top" alt="country foto" />
                </div>
                  <div class="card-body">
                    <h5 class="card-title">${element.name}</h5>
                    <p class="card-text">${element.region}</p>
                    <p class="card-text">${element.population}</p>
                    <p class="card-text">${element.capital}</p>
                  </div>
                </div>
                </a>
            </div>
  `;
  });
}

search.addEventListener("input", function (event) {
  axios(BASE_URL).then((res) => {
    const filteredUsers = res.data.filter((element) => {
      return `${element.name}`
        .toLocaleLowerCase()
        .includes(event.target.value.toLocaleLowerCase());
    });
    //   console.log(filteredUsers);
    drawCountry(filteredUsers);
  });
});

select.addEventListener("change", function (event) {
  axios(BASE_URL).then((res) => {
    const selectRegion = res.data.filter((element) => {
      return (
        `${element.region}`.toLocaleLowerCase() ==
        event.target.value.toLocaleLowerCase()
      );
    });
    drawCountry(selectRegion);
  });
});
