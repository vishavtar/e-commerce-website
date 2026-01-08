let myAccountLinkCTA = document.getElementById("myAccountLinkCTA");
const topProductSearch = document.getElementById("topProductSearch");
const productDropDown = document.getElementById("productDropDown");
let currentpage;
let catmenuList = JSON.parse(localStorage.getItem("ProductItems"));

function productDropDownMenu(){
  
  productDropDown.innerHTML="";

  catmenuList.forEach(element => {
    console.log(element);
    let html="";
    element.sub_categories.forEach(item =>{
       
      html+=`<li><a href='shop.html?browseCat=${item.id}'>${item.name}</a></li>`;
    })
    console.log(element);
    productDropDown.innerHTML+=`
                      <div class="col-menu col-md-3">
                        <a class="title" href='shop.html?browseCat=${element.id}'>${element.name}</a>
                        <div class="content">
                          <ul class="menu-col">
                            ${html}
                          </ul>
                        </div>
                      </div>`
  });
}
productDropDownMenu();

// document.addEventListener("DOMContentLoaded", () => {
  //   if (getAuthToken()) {
//     myAccountLinkCTA.innerHTML=`<a href="my-account.html" id="myAccountLinkCTA">${store_local_user_details.name}</a>`
//     // myAccountLinkCTA.setAttribute("href", "my-account.html");
//   } else {
  //     // myAccountLinkCTA.setAttribute("href", "login.html");
//     myAccountLinkCTA.innerHTML=`<a href="login.html" id="myAccountLinkCTA">My Account</a>`
//   }
// });

let store_local_user_details = {};
// store_local_user_details = atob(store_local_user_details);

function userdetailsMethod(dataName) {
  setUserDetailsLocale(dataName);
  getUserDetailsLocale();
  
  if (dataName.name) {
    myAccountLinkCTA.innerHTML=`<a href="my-account.html">${store_local_user_details.name}</a>`
  } else {
    myAccountLinkCTA.innerHTML=`<a href="login.html">My Account</a>`
  }
  return true
}
function fetchProfileDetails() {
  if (!getAuthToken()) {
    return;
  }
  callApi("profile", "GET", null, true)
  .then((results) => {
    console.log(results);
    accessTokenValidation(results.status);
    userdetailsMethod(results.data);
    console.log(results.data)
  }).then(() => {
    profileDataRefrash();
    console.log("Profile details fetched successfully");
  })
  .catch((error) => console.log(error));
}

fetchProfileDetails();
topProductSearch.addEventListener("keydown",(event)=>{
  if(event.key == "Enter" && event.target.value.length > 3){
    window.location.href="shop.html?query="+topProductSearch.value;
  }
})
