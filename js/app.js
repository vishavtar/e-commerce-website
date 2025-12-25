let landingPage = document.getElementById("landingPage");
let myAccount = document.getElementById("myAccount");
let categoriesList = document.getElementById("categoriesList");

function renderCategoriesList(value) {
  categoriesList.innerHTML = "";
  value.forEach((element) => {
    categoriesList.innerHTML += `
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    <div class="shop-cat-box">
                        <img class="img-fluid" src=${
                          element.imgurl
                            ? element.imgurl
                            : `https://placehold.co/150x150`
                        } alt="" />
                        <a class="btn hvr-hover" href="#">${element.name}</a>
                    </div>
                </div>`;
  });
}

function getCategoriesList() {
  callApi("categories", "GET", null, true)
    .then((results) => {
      renderCategoriesList(results.data);
    })
    .catch((error) => console.log(error));
}
getCategoriesList();
