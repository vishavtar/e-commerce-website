let baseURL = "https://www.iamtiksha.com/apis/store/public/api/v1/";

let accesstokencheck = localStorage.getItem("token");

function setAuthToken(value) {
  localStorage.setItem("token", value);
}

function getAuthToken() {
  if (!localStorage.getItem("token")) {
    return false;
  }
  const token = localStorage.getItem("token");
  return token;
}
function accessTokenValidation(response) {
  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem("token");
    window.location.href = "login.html";
    return true
  }
  else{
    return false
  }
}
function setUserDetailsLocale(value) {
  console.log(value);
  const profileDetailsSet = JSON.stringify(value);

  localStorage.setItem("userDetails", btoa(profileDetailsSet));
  console.log("aet local values",value);
}
function getUserDetailsLocale() {
  if (localStorage.getItem("userDetails")) {
    store_local_user_details = localStorage.getItem("userDetails");
    store_local_user_details = JSON.parse(atob(store_local_user_details));
    return true;
  } else {
    return false;
  }
}
// function callApi(endPoint, dataPoints) {
//   return fetch(baseURL + endPoint, dataPoints).then((response) => {
//     return response.json();
//   });
// }

function callApi(endPoint, method = "GET", body = null, accessToken = false) {
  const headers = {};
  if (accessToken) {
    headers.Authorization = `Bearer ${getAuthToken()}`;
  }

  if (typeof body === "string" ) {
    console.log("form type",typeof body)
    headers["Content-Type"] = "application/json";
  }

  const dataPoints = {
    method,
    headers,
  };

  if (body) dataPoints.body = body;

  return fetch(baseURL + endPoint, dataPoints).then((response) => {
    // console.log(response);
    accessTokenValidation(response);
    return response.json();
  });
}

// How to use call API
/*
callApi("categories", "GET" , body_object_name)
.then((results) => {
    renderCategoriesList(results.data);
})
.catch((error) => console.log(error));
*/
