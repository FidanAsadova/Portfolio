let nameCard = new URLSearchParams(window.location.search).get("name");
let BASE_URL = "https://restcountries.com/v3.1/name/";
let row = document.querySelector(".row");

axios(`${BASE_URL}/${nameCard}`).then((res) => drawDetailsCard(res.data));
axios(`${BASE_URL}/${nameCard}`).then((res) => console.log(res.data));

function drawDetailsCard(arr) {
  row.innerHTML = "";

  arr.forEach((element) => {
    row.innerHTML = `
    <div class="allInfo d-flex border-0">
            <div class="country-img card w-50 border-0 ">
              <img src="${element.flags?.svg}" alt="flags" />
            </div>
            <div class="country-info card w-50 border-0 p-3">
              <h3><b>${element.name.common}</b></h3>
              <div class="rl-info">
                <div class="left">
                  <p><b>Native Name:</b> ${
                    Object.values(element.name.nativeName)[0].common
                  }</p>
                  <p><b>Population:</b> ${element.population}</p>
                  <p><b>Region:</b> ${element.region}</p>
                  <p><b>Subregion:</b> ${element.subregion}</p>
                  <p><b>Capital:</b> ${element.capital}</p>
                </div>
                <div class="right">
                  <p><b>Top Level Domain:</b> ${element.tld[0]}</p>
                  <p><b>Currencies</b>: ${
                    Object.values(element.currencies)[0].name
                  }</p>
                  <p><b>Languages:</b> ${element.languages?.ara}</p>
                </div>
              </div>
              <div class="border-countrys"><b>Border Countrys: </b>
              <p>${element.borders[0]}</p> 
              <p>${element.borders[1]}</p> 
              <p>${element.borders[3]}</p>
            </div>
          </div>
    `;
  });
}
