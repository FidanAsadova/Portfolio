let BASE_URL = "https://northwind.vercel.app/api/suppliers";
let robots = document.querySelector(".allrobots");
let sort = document.querySelector(".sort");
let search = document.querySelector("#search");
let bool = false;

async function getData() {
  let res = await axios.get(BASE_URL);
  let data = await res.data;
  console.log(data);
  drawRobot(data);
}

getData();

function drawRobot(arr) {
  robots.innerHTML = "";
  arr.forEach((element) => {
    robots.innerHTML += `
    <span class="col col-sm-12 col-md-6 col-lg-3">
              <div class="robot pt-5">
                <div class="robot-img d-flex justify-content-center">
                    <img class="" src="./assets/img/p1.png" alt="" />
                </div>
                <div class="robot-bottom dinamik">
                    <div class="robot-js">
                        <div class="robot-item d-flex flex-column  p-3">
                            <p class="robot-title text-center">${element.companyName}</p>
                            <p class="robot-body text-center text-secondary">${element.contactTitle}</p>
                        </div>
                        <div class="btns d-flex flex-column w-100 p-4 gap-1">
                            <a href="details.html?id=${element.id}" class="btn rounded-0 border-dark text-dark bg-light">View details</a>
                            <a href="add-edit.html?id=${element.id}" class="btn rounded-0 border-dark text-primary bg-light">Edit</a>
                            <button class="btn rounded-0 border-dark text-danger bg-light" onclick="deleteRobot(${element.id},this)">Delete</button>
                            <button class="btn rounded-0 border-dark text-success bg-light">Favorite</button>
                        </div>
                    </div>
                </div>
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
    sorted = data.sort((a, b) => a.companyName.localeCompare(b.companyName));
  } else {
    sorted = data.sort((a, b) => b.companyName.localeCompare(a.companyName));
  }
  drawRobot(sorted);
  bool = !bool;
});

search.addEventListener("input", async function (e) {
  let res = await axios.get(BASE_URL);
  let data = await res.data;
  const searchName = data.filter((item) => {
    return `${item.companyName}`
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase());
  });
  drawRobot(searchName);
});

async function deleteRobot(id, btn) {
  await axios.delete(`${BASE_URL}/${id}`);
  btn.closest("span").remove()
}


