let id = new URLSearchParams(window.location.search).get("id");
let BASE_URL = "https://northwind.vercel.app/api/suppliers";
let cardsDetails = document.querySelector(".cardsDetails");

async function getData() {
  let res = await axios.get(`${BASE_URL}/${id}`);
  let data = await res.data;
  console.log(data);
  drawDetails(data);
}

getData();

function drawDetails(element) {
  cardsDetails.innerHTML = `
        <div class="col col-sm-12 col-md-6 col-lg-3">
                <div class="robot pt-5">
                  <div class="robot-img d-flex justify-content-center">
                    <img class="" src="./assets/img/p1.png" alt="" />
                  </div>
                  <div class="robot-bottom dinamik">
                    <div class="robot-js">
                      <div class="robot-item d-flex flex-column p-3">
                        <p class="robot-title text-center">${element.companyName}</p>
                        <p class="robot-body text-center text-secondary">${element.contactTitle}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        `;
}
