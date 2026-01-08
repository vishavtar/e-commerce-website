const shop_categories_list = document.getElementById("shop_categories_list");
const searchPrducts = document.getElementById("searchPrducts");
const searchPrductsCTA = document.getElementById("searchPrductsCTA");
const mainCategories = document.getElementsByClassName("mainCategories");
const subCategories = document.getElementsByClassName("subCategories");
const showALlProducts = document.getElementById("showALlProducts");
const allProductsPagination = document.getElementById("allProductsPagination");
const paginationBtn = document.getElementsByClassName("pagination-btn");
const proSortOption = document.getElementById("proSortOption");

let productsArray=[];
let newproductsArray =[];

const currentUrl = window.location.search;
const searchParamsCurrentUrl = new URLSearchParams(currentUrl);

if(searchParamsCurrentUrl.get("browseCat")){
  let landOnMainCat = searchParamsCurrentUrl.get("browseCat");
  loadMainCat("categories/"+landOnMainCat);
}


function shop_categories_nav(value) {
  let cathtml = "";
  value.forEach((element, index) => {
    let showcat = index == 0 ? "show" : "";
    // console.log(element);
    let c_Name = "categoriesId" + element.name.toLowerCase();
    
    cathtml += `
    <div class="list-group-collapse sub-men">
                    <a
                      class="list-group-item list-group-item-action list-group-item-main-cott mainCategories"
                      href=#${c_Name}
                      data-toggle="collapse"
                      data-catId=${element.id}
                      aria-expanded="false"
                      aria-controls=${c_Name}
                      >${element.name} <small class="text-muted">(${element.sub_categories_count})</small>
                    </a>
                    <div
                      class="collapse ${showcat}"
                      id=${c_Name}
                      data-parent="#shop_categories_list"
                    >`;
    if (element.sub_categories_count > 0) {
      `${element.sub_categories.forEach((e, idx) => {
        let activeId = idx == 0 ? "active" : "";
        cathtml += `<div class="list-group">
                        <a
                          href="javascript:void(0);"
                          class="list-group-item list-group-item-action ${activeId} subCategories"
                          data-subCatId=${e.id}
                          >${e.name} <small class="text-muted">(${e.products.length})</small></a
                        >
                       
                      </div>`;
      })}`;
    }
    cathtml += `
                    </div>
                  </div>
                  `;
  });
  
  shop_categories_list.innerHTML += cathtml;
  defaultLoad();
  mainCtaOpration();
  subCtaOpration();
}

function getCategories_shop() {
  callApi("categories", "GET", null, false)
  .then((result) => {
    shop_categories_nav(result.data);
  })
  .catch((error) => console.log(error));
}
getCategories_shop();

function searchproductFunction(value){
  if(value.length> 3){
    loadMainCat(`products?search=${value}`,"products");
  }
}
searchPrducts.addEventListener("keyup",(event)=>{
  searchproductFunction(event.target.value);
  console.log(event.target.value);
})
searchPrductsCTA.addEventListener("click",()=>{
    searchproductFunction(searchPrducts.value);
  console.log(searchPrducts.value);
})

if(searchParamsCurrentUrl.get("query")){
  searchproductFunction(searchParamsCurrentUrl.get("query"))
  // console.log(searchParamsCurrentUrl.get("query"));
}

function showAllCategories(value,min=0,max=11111111111111){  
  // console.log("inside showAllCategories",value);
  showALlProducts.innerHTML="";
  for(let i of value){
    let price;
    let priceHTML;
    let saleHTML;
    // console.log(i);
    if(parseInt(i.sale_price) < parseInt(i.regular_price)){
      price = i.sale_price;
      priceHTML = `<s>₹${i.regular_price}</s> <span style="color:red;">₹${i.sale_price}</span>`;
      saleHTML = ` <div class="type-lb">
                              <p class="sale">Sale</p>
                            </div>`
      
    }else{
      priceHTML = `₹${i.regular_price}`;
      saleHTML="";
      price = i.regular_price
    }
    
    if((price >= min) && (price <= max)){
      
      showALlProducts.innerHTML+=
      `
    <div class="col-sm-6 col-md-6 col-lg-4 col-xl-4">
                        <div class="products-single fix">
                          <div class="box-img-hover">
                           ${saleHTML}
                            <img
                              src=${i.images[0].path}
                              class="img-fluid"
                              alt="Image"
                            />
                            <div class="mask-icon" onclick='showDetails(${i.id})'>
                              <ul>
                                <li>
                                  <a
                                    href="#"
                                    data-toggle="tooltip"
                                    data-placement="right"
                                    title="Add to Wishlist"
                                    ><i class="far fa-heart"></i
                                  ></a>
                                </li>
                              </ul>
                              <a class="cart" href="#">Add to Cart</a>
                            </div>
                          </div>
                          <div class="why-text">
                            <h4 onclick='showDetails(${i.id})'>${i.name}</h4>
                            <h5>
                            ${priceHTML}
                            </h5>
                            <h5></h5>
                          </div>
                        </div>
                      </div>
    `
    }
  }
}

function productRangeSlider(){
  // console.log("Started productRangeSlider");
  let productsArrayNew = productsArray.map((elements) =>{
    if(elements.sale_price){
      return parseInt(elements.sale_price);
    }else{
      return parseInt(elements.regular_price);
    }
  })
  productsArrayNew.sort((a,b) => a-b);
  //   console.log(productsArrayNew.length);
  $("#slider-range").slider({
    range: true,
    min: productsArrayNew[0],
    max: productsArrayNew[productsArrayNew.length-1],
    values: [productsArrayNew[0], productsArrayNew[productsArrayNew.length-1]],
    slide: function (event, ui) {
      $("#amount").val("₹" + ui.values[0] + " - ₹" + ui.values[1]);
    },
    change: function(event,ui){
      showAllCategories(productsArray,ui.values[0],ui.values[1])
    }
  });
  $("#amount").val(
    "₹" +
    $("#slider-range").slider("values", 0) +
    " - ₹" +
    $("#slider-range").slider("values", 1)
  );
  
}

function defaultLoad(){
  loadMainCat("sub-categories","sub-categories");
}

function mainCtaOpration(){
  for( let cat in mainCategories){
    // console.log(typeof mainCategories[cat]);
    if(typeof mainCategories[cat] == "object"){
      mainCategories[cat].addEventListener("click",(event)=>{
        event.preventDefault();
        loadMainCat("categories/"+event.target.getAttribute("data-catId"))
      })
    }
    
  }
};
function subCtaOpration(){
  for (let sub in subCategories){ 
    if(typeof subCategories[sub] == "object"){
      //  console.log("sub cat",sub);
      subCategories[sub].addEventListener("click",(event)=>{
        loadMainCat("sub-categories/"+event.target.getAttribute("data-subCatId"));
        console.log(event.target.getAttribute("data-subCatId"));
      })
    }
  }
}

async function loadMainCat(catId, types) {
  // console.log("started loadMainCat with",catId)
  try{
    const fetchApi =  await fetch(`${baseURL}${catId}`);
    const result = await fetchApi.json();
  
    if(types == "sub-categories"){
      // console.log("result1")
      for(let i of result.data){
        if(i.products.length > 0){
          productsArray.push(...i.products);
          showAllCategories(i.products);
          productRangeSlider();
          renderPagination(result.meta);
        }
      }      
    }else if (types == "products") {
      showAllCategories(result.data);
      productsArray = result.data;
      productRangeSlider();
    }else{
      showAllCategories(result.data.products);
      productsArray = result.data.products;
      productRangeSlider();
    }
  }
  catch(error){
    console.log(error)
  }
}


function showDetails(id){
  window.location.href="shop-detail.html?products="+id;
}

function renderPagination(value){
  allProductsPagination.innerHTML="";
  // console.log("pagination ",value);
  value.links.forEach(element => {
    let pageUrl = element.url;
    // console.log(pageUrl);
    let newPageUrl = pageUrl !== null? pageUrl.replace("https://www.iamtiksha.com/apis/store/public/api/v1/",""): null;
    allProductsPagination.innerHTML+=`
    <button type="button" dataUrl=${newPageUrl} class="btn btn-danger pagination-btn">${element.label}</button>
    `
  });
  mainCtaOprationPage();
}

function mainCtaOprationPage(){
  for( let list in paginationBtn){
    // console.log(typeof paginationBtn[cat]);
    if(typeof paginationBtn[list] == "object"){
      paginationBtn[list].addEventListener("click",(event)=>{
        let pageNumber = event.target.getAttribute("dataUrl");
        event.preventDefault();
        loadMainCat(pageNumber);
        // console.log(dataUrl);
      })
    }
    
  }
};


proSortOption.addEventListener("change",(event)=>{
  
  let value = event.target.value;
  
  if(value == "high_to_low"){
    newproductsArray =  productsArray.sort((a,b) => b.regular_price - a.regular_price);

    showAllCategories(newproductsArray);
  }else if(value == "low_to_high"){
    newproductsArray =  productsArray.sort((a,b) => a.regular_price - b.regular_price);
    showAllCategories(newproductsArray);
  }
  
})