let formLogin = document.getElementById("formLogin");
let formRegister = document.getElementById("formRegister");
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

// Login AND Register Devlopment

let userLoginDetails = {
  // email:"",
  // phone_number:"",
  // password: "",
};

function prePostformLogin() {
  if (isNaN(InputEmail.value)) {
    delete userLoginDetails.phone_number;
    userLoginDetails.email = InputEmail.value.trim();
  } else {
    delete userLoginDetails.email;
    userLoginDetails.phone_number = InputEmail.value.trim();
  }
  userLoginDetails.password = InputPassword.value;
}

function postformLoginData(status) {
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

formLogin.addEventListener("submit", (event) => {
  event.preventDefault();
});

function logAPTDataSubmit() {
  prePostformLogin();
  callApi("login", "POST", userLoginDetails)
    .then((results) => {
      postformLoginData(results);
      if (results.status == "success") {
        setAuthToken(results.access_token);
        // history.back();
        console.log("CP", currentpage);
        if (currentpage && currentpage != null) {
          window.location.href = currentpage;
        } else {
          window.location.href = "index.html";
        }
      }
      console.log(results.status);
    })
    .catch((error) => console.log(error));
}

const validator = new JustValidate("#formLogin");

validator
  .addField("#InputEmail", [
    {
      rule: "required",
    },
    {
      rule: "required",
    },
    {
      rule: "email",
    },
  ])
  .addField("#InputPassword", [
    {
      rule: "required",
    },
  ])
  .onSuccess(() => {
    logAPTDataSubmit();
  })
  .onFail((fields) => {
    console.log(fields);
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

let registerValidator = new JustValidate("#formRegister");

registerValidator
  .addField("#InputName", [
    {
      rule: "required",
    },
    {
      rule: "minLength",
      value: 3,
    },
    {
      rule: "maxLength",
      value: 15,
    },
  ])
  .addField("#InputLastname", [
    {
      rule: "required",
    },
    {
      rule: "minLength",
      value: 3,
    },
    {
      rule: "maxLength",
      value: 15,
    },
  ])
  .addField("#InputEmail1", [
    {
      rule: "required",
    },
    {
      rule: "required",
    },
    {
      rule: "email",
    },
  ])
  .addField("#Inputphone", [
    {
      rule: "required",
    },
    {
      rule: "number",
    },
    {
      rule: "minLength",
      value: 10,
    },
    {
      rule: "maxLength",
      value: 10,
    },
  ])
  .addField("#InputPassword1", [
    {
      rule: "required",
    },
    {
      rule: "password",
    },
  ])
  .addField("#InputPassword2", [
    {
      rule: "required",
    },
    {
      rule: "password",
    },
  ])
  .onSuccess(() => {
    formRegisterSubmit();
  })
  .onFail((fields) => {
    console.log(fields);
  });

formRegister.addEventListener("submit", (event) => {
  event.preventDefault();
});

function postformRegisterData(status) {
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
}

function formRegisterSubmit() {
  userProfileDetails.name = InputName.value + " " + InputLastname.value;
  userProfileDetails.email = InputEmail1.value;
  userProfileDetails.phone_number = Inputphone.value;
  userProfileDetails.password = InputPassword1.value;
  userProfileDetails.password_confirmation = InputPassword2.value;

  callApi("register", "POST", userProfileDetails, false)
    .then((results) => {
      postformRegisterData(results);
      console.log(results.status);
      setAuthToken(results.access_token);
    })
    .catch((error) => console.log(error));
}
