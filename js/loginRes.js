let myAccountLinkCTA = document.getElementById("myAccountLinkCTA");
let categoriesList = document.getElementById("categoriesList");
let formRegisterSubmit = document.getElementById("formRegisterSubmit");
let formLoginSubmit = document.getElementById("formLoginSubmit");
let InputName = document.getElementById("InputName");
let InputLastname = document.getElementById("InputLastname");
let InputEmail1 = document.getElementById("InputEmail1");
let Inputphone = document.getElementById("Inputphone");
let InputPassword1 = document.getElementById("InputPassword1");
let InputPassword2 = document.getElementById("InputPassword2");
let InputEmail = document.getElementById("InputEmail");
let InputPassword = document.getElementById("InputPassword");
let statusMessage = document.getElementById("statusMessage");
let statusLoginMessage = document.getElementById("statusLoginMessage");
let basAPIURL = "https://www.iamtiksha.com/apis/store/public/api/v1/";

// Login AND Register Devlopment

let userLoginDetails = {
  // email:"",
  // phone_number:"",
  // password: "",
};

function prePostformLogin() {
  if (InputEmail.value && InputPassword.value) {
    isNaN(InputEmail.value)
      ? (userLoginDetails.email = InputEmail.value.trim())
      : (userLoginDetails.phone_number = InputEmail.value.trim());
    userLoginDetails.password = InputPassword.value;
    return true;
  } else {
    statusLoginMessage.innerText = "Email or phone and password is required";
    return false;
  }
}
function postformLoginData(status) {
  if (!InputEmail.value) {
    InputEmail.nextElementSibling.innerText = status.message.email;
    return false;
  } else {
    InputEmail.nextElementSibling.innerText = "";
  }
  if (!InputPassword.value) {
    InputPassword.nextElementSibling.innerText = status.message.password;
    return false;
  } else {
    InputPassword.nextElementSibling.innerText = "";
  }
  if (isNaN(InputEmail.value)) {
    userLoginDetails.email = InputEmail.value.trim();
  } else {
    userLoginDetails.phone_number = InputEmail.value.trim();
  }
  userLoginDetails.password = InputPassword.value;

  if (status.status == "error") {
    statusLoginMessage.innerText = "";
    for (let key in status.message) {
      statusLoginMessage.innerText += status.message[key];
    }
    statusLoginMessage.style.color = "red";
  } else {
    statusLoginMessage.style.color = "green";
    statusLoginMessage.innerText = status.status;
  }
}

formLoginSubmit.addEventListener("click", () => {
  if (!prePostformLogin()) {
    return false;
  }
  fetch(`${basAPIURL}login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userLoginDetails),
  })
    .then((response) => response.json())
    .then((results) => {
      postformLoginData(results);
      if (results.status == "success") {
        localStorage.setItem("token", results.access_token);
        window.location.href = "index.html";
      }
      console.log(results.status);
    })
    .catch((error) => console.log(error));
});

// Login End

//Register Started

let userProfileDetails = {
  name: "",
  email: "",
  phone_number: "",
  password: "",
  password_confirmation: "",
};

function postformRegisterData(status) {
  if (!InputName.value) {
    InputName.nextElementSibling.innerText = status.message.name;
    return false;
  } else {
    InputName.nextElementSibling.innerText = "";
  }
  if (!InputLastname.value) {
    InputLastname.nextElementSibling.innerText = status.message.name;
    return false;
  } else {
    InputLastname.nextElementSibling.innerText = "";
  }
  if (!InputEmail1.value) {
    InputEmail1.nextElementSibling.innerText = status.message.email;
    return false;
  } else {
    InputEmail1.nextElementSibling.innerText = "";
  }
  if (!Inputphone.value) {
    Inputphone.nextElementSibling.innerText = status.message.phone_number;
    return false;
  } else {
    Inputphone.nextElementSibling.innerText = "";
  }
  if (!InputPassword1.value) {
    InputPassword1.nextElementSibling.innerText = status.message.password;
    return false;
  } else {
    InputPassword1.nextElementSibling.innerText = "";
  }
  if (!InputPassword2.value) {
    InputPassword2.nextElementSibling.innerText = status.message.password;
    return false;
  } else {
    InputPassword2.nextElementSibling.innerText = "";
  }

  if (status.status == "error") {
    statusMessage.innerText = "";
    for (let key in status.message) {
      statusMessage.innerText += status.message[key];
    }
    statusMessage.style.color = "red";
  } else {
    statusMessage.style.color = "green";
    statusMessage.innerText = status.message;
  }
  userProfileDetails.name = InputName.value + " " + InputLastname.value;
  userProfileDetails.email = InputEmail1.value;
  userProfileDetails.phone_number = Inputphone.value;
  userProfileDetails.password = InputPassword1.value;
  userProfileDetails.password_confirmation = InputPassword2.value;
}

formRegisterSubmit.addEventListener("click", () => {
  fetch(`${basAPIURL}register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userProfileDetails),
  })
    .then((response) => response.json())
    .then((results) => {
      postformRegisterData(results);

      if (results.status == "success") {
        window.location.href = "index.html";
      }
      console.log(results.status);
    })
    .catch((error) => console.log(error));
});
