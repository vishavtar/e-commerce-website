let myAccountLinkCTA = document.getElementById("myAccountLinkCTA");
let currentpage;
document.addEventListener("DOMContentLoaded", () => {
  if (getAuthToken()) {
    myAccountLinkCTA.setAttribute("href", "my-account.html");
  } else {
    myAccountLinkCTA.setAttribute("href", "login.html");
  }
});

let store_local_user_details = {};
// store_local_user_details = atob(store_local_user_details);

function userdetailsMethod(dataName) {
  setUserDetailsLocale(dataName);
  getUserDetailsLocale();

  if (dataName.name) {
    myAccountLinkCTA.innerText = store_local_user_details.name;
  } else {
    myAccountLinkCTA.innerText = "My Account";
  }
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
      console.log(results.data);

      profileDataRefrash();
    })
    .catch((error) => console.log(error));
}
fetchProfileDetails();
