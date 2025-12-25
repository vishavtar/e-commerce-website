const profile_details_Info = document.getElementById("profile_details_Info");
const profile_details_name = document.getElementById("profile_details_name");
const profile_details_email = document.getElementById("profile_details_email");
const profile_details_phoneNo = document.getElementById(
  "profile_details_phoneNo"
);
const profile_details_country = document.getElementById(
  "profile_details_country"
);
const profile_details_city = document.getElementById("profile_details_city");
const profile_details_postal_code = document.getElementById(
  "profile_details_postal_code"
);
const profile_details_avatar = document.getElementById(
  "profile_details_avatar"
);
const profile_details_address_current = document.getElementById(
  "profile_details_address_current"
);
const profile_details_address_permanent = document.getElementById(
  "profile_details_address_permanent"
);
const profile_details_common_error = document.getElementById(
  "profile_details_common_error"
);
const save_Profile_details = document.getElementById("save_Profile_details");
const edit_Profile_details = document.getElementById("edit_Profile_details");
const contactForm = document.getElementById("contactForm");

const profileUpdateContentData = {
  name: "",
  email: "",
  phone_number: "",
  country: "",
  city: "",
  avatar: "",
  address_1: "",
  address_2: "",
  postal_code: "",
};

function profileDataRefrash() {
  if (getUserDetailsLocale()) {
    profile_details_Info.innerHTML = `
  <img src=${
    store_local_user_details.avatar
      ? store_local_user_details.avatar
      : "https://placehold.co/60x60/png"
  } alt=${store_local_user_details.name} height="60" width="60" />
  <h2>${store_local_user_details.name}</h2>
            <ul>
              <li><p><i class="fas fa-map-marker-alt"></i>Address: ${
                store_local_user_details.address_1
              }</p>
                <p><i class="fas fa-map-marker-alt"></i>Address 2: ${
                  store_local_user_details.address_2
                }</p>
              </li>
              <li>
                <p>
                  <i class="fas fa-phone-square"></i>Phone:
                  <a href="tel:+91${
                    store_local_user_details.phone_number
                  }">+91 ${store_local_user_details.phone_number}</a>
                </p>
              </li>
              <li>
                <p>
                  <i class="fas fa-envelope"></i>Email:
                  <a href="mailto:${store_local_user_details.email}">${
      store_local_user_details.email
    }</a>
                </p>
              </li>
            </ul>
  `;

    profile_details_name.value = store_local_user_details.name;
    profile_details_email.value = store_local_user_details.email;
    profile_details_phoneNo.value = store_local_user_details.phone_number;
    profile_details_country.value = store_local_user_details.country;
    profile_details_city.value = store_local_user_details.city;
    profile_details_postal_code.value = store_local_user_details.postal_code;
    profile_details_address_current.value = store_local_user_details.address_1;
    profile_details_address_permanent.value =
      store_local_user_details.address_2;
  } else {
    currentpage = window.location.pathname;
    window.location.href = "login.html";
  }
}

profileDataRefrash();

function isdisabledprofileUpdateContent() {
  if (!contactForm) return;
  contactForm.querySelectorAll(".form-control").forEach((value) => {
    value.disabled = true;
  });
  save_Profile_details.style.display = "none";

  edit_Profile_details.addEventListener("click", () => {
    contactForm.querySelectorAll(".form-control").forEach((value) => {
      value.disabled = false;
    });
    edit_Profile_details.style.display = "none";
    save_Profile_details.style.display = "inline-block";
  });
}
isdisabledprofileUpdateContent();

const profileFormValidation = new window.JustValidate("#contactForm");
profileFormValidation
  .addField("#profile_details_name", [
    {
      rule: "required",
    },
  ])
  .addField("#profile_details_email", [
    {
      rule: "required",
    },
    {
      rule: "email",
    },
  ])
  .addField("#profile_details_phoneNo", [
    {
      rule: "required",
    },
    {
      rule: "number",
    },
  ])
  .addField("#profile_details_country", [
    {
      rule: "required",
    },
  ])
  .addField("#profile_details_city", [
    {
      rule: "required",
    },
  ])
  .addField("#profile_details_postal_code", [
    {
      rule: "required",
    },
  ])
  .addField("#profile_details_address_current", [
    {
      rule: "required",
    },
  ])
  .addField("#profile_details_address_permanent", [
    {
      rule: "required",
    },
  ])
  .onSuccess(() => {
    const formData = profileUpdateContent();
    callApi("profile", "POST", formData, true)
      .then((results) => {
        profile_details_common_error.innerHTML = results.status;
        console.log("post", results.status);
        if (results.status == "success") {
          contactForm.querySelectorAll(".form-control").forEach((value) => {
            value.disabled = true;
            edit_Profile_details.style.display = "inline-block";
            save_Profile_details.style.display = "none";
          });
        }
        fetchProfileDetails();
      })
      .catch((error) => console.log(error));
  })
  .onFail(
    (profile_details_common_error.innerHTML =
      "Please Enter all valid Information")
  );

function profileUpdateContent() {
  console.log(profile_details_avatar.files[0]);
  const formData = new FormData();
  formData.append("name", profile_details_name.value);
  formData.append("email", profile_details_email.value);
  formData.append("phone_number", profile_details_phoneNo.value);
  formData.append("country", profile_details_country.value);
  formData.append("city", profile_details_city.value);
  formData.append("postal_code", profile_details_postal_code.value);
  formData.append("address_1", profile_details_address_current.value);
  formData.append("address_2", profile_details_address_permanent.value);
  if (profile_details_avatar.files && profile_details_avatar.files[0]) {
    formData.append("avatar", profile_details_avatar.files[0]);
  }
  return formData;
}
