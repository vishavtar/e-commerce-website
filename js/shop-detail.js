const productDetailsCon = document.getElementById("productDetailsCon");
const currentUrl = window.location.search;
const searchParamsCurrentUrl = new URLSearchParams(currentUrl).get("products");

function productDetails(value){
    let smallImages ="";
    let largeImages="";
    
    console.log(value);
    
    value.images.forEach((element,index) => {
         largeImages+=`
        <div class="carousel-item ${ index == 0 ? "active": ""}">
                  <img
                    class="d-block w-100"
                     src=${element.path}
                    alt=""
                  />
                </div>`;

                 smallImages +=`
        <li
                  data-target="#carousel-example-1"
                  data-slide-to=${index}
                  class=${ index == 0 ? "active": ""}
                >
                  <img
                    class="d-block w-100 img-fluid"
                    src=${element.path}
                    alt=""
                  />
                </li>
        `;
    });
    
    productDetailsCon.innerHTML=`
<div class="row">
          <div class="col-xl-5 col-lg-5 col-md-6">
            <div
              id="carousel-example-1"
              class="single-product-slider carousel slide"
              data-ride="carousel"
            >
              <div class="carousel-inner" role="listbox">
                ${largeImages}
              </div>
              <a
                class="carousel-control-prev"
                href="#carousel-example-1"
                role="button"
                data-slide="prev"
              >
                <i class="fa fa-angle-left" aria-hidden="true"></i>
                <span class="sr-only">Previous</span>
              </a>
              <a
                class="carousel-control-next"
                href="#carousel-example-1"
                role="button"
                data-slide="next"
              >
                <i class="fa fa-angle-right" aria-hidden="true"></i>
                <span class="sr-only">Next</span>
              </a>
              <ol class="carousel-indicators">
                ${smallImages}
              </ol>
            </div>
          </div>
          <div class="col-xl-7 col-lg-7 col-md-6">
            <div class="single-product-details">
              <h2>${value.name}</h2>
              <h5><del>${value.regular_price}</del> ${value.sale_price}</h5>
              <p class="available-stock">
                <span> More than ${value.stock} available / <a href="#">${value.sold_count} sold </a></span>
              </p>
              <p></p>
              <h4>Description:</h4>
              <p>
                ${value.description}
              </p>
              <ul>
                <li>
                  <div class="form-group size-st">
                    <label class="size-label">Size</label>
                    <select
                      id="basic"
                      class="selectpicker show-tick form-control"
                    >
                      <option value="0">Size</option>
                      <option value="0">S</option>
                      <option value="1">M</option>
                      <option value="1">L</option>
                      <option value="1">XL</option>
                      <option value="1">XXL</option>
                      <option value="1">3XL</option>
                      <option value="1">4XL</option>
                    </select>
                  </div>
                </li>
                <li>
                  <div class="form-group quantity-box">
                    <label class="control-label">Quantity</label>
                    <input
                      class="form-control"
                      value="0"
                      min="0"
                      max=${value.stock}
                      type="number"
                    />
                  </div>
                </li>
              </ul>
    
              <div class="price-box-bar">
                <div class="cart-and-bay-btn">
                  <a class="btn hvr-hover" data-fancybox-close="" href="#"
                    >Buy New</a
                  >
                  <a class="btn hvr-hover" data-fancybox-close="" href="#"
                    >Add to cart</a
                  >
                </div>
              </div>
    
              <div class="add-to-btn">
                <div class="add-comp">
                  <a class="btn hvr-hover" href="#"
                    ><i class="fas fa-heart"></i> Add to wishlist</a
                  >
                </div>
                <div class="share-bar">
                  <a class="btn hvr-hover" href="#"
                    ><i class="fab fa-facebook" aria-hidden="true"></i
                  ></a>
                  <a class="btn hvr-hover" href="#"
                    ><i class="fab fa-google-plus" aria-hidden="true"></i
                  ></a>
                  <a class="btn hvr-hover" href="#"
                    ><i class="fab fa-twitter" aria-hidden="true"></i
                  ></a>
                  <a class="btn hvr-hover" href="#"
                    ><i class="fab fa-pinterest-p" aria-hidden="true"></i
                  ></a>
                  <a class="btn hvr-hover" href="#"
                    ><i class="fab fa-whatsapp" aria-hidden="true"></i
                  ></a>
                </div>
              </div>
            </div>
          </div>
        </div>
`
}

async function loadDetails(id) {
    try{
        const fetchApi =  await fetch(`${baseURL}products/${id}`);
        const result = await fetchApi.json();    
        console.log(result.data)
        productDetails(result.data);
    }
    catch(error){
        console.log(error)
    }
}
loadDetails(searchParamsCurrentUrl);