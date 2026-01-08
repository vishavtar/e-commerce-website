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
                        <a class="btn hvr-hover" href="shop.html?browseCat=${element.id}">${element.name}</a>
                    </div>
                </div>`;
});
}

function getCategoriesList() {
  callApi("categories", "GET", null, true)
  .then((results) => {
    localStorage.setItem("ProductItems",JSON.stringify(results.data));
    // console.log(productMenu);
    if(categoriesList){
      renderCategoriesList(results.data);
    }
  })
  .catch((error) => console.log(error));
}
getCategoriesList();
