const categoriesContainer = document.getElementById("categoriesContainer");
const currentUrl = window.location.href;
let categories;
function categoriesList() {
  callApi("categories", "GET", null, true)
    .then((result) => {
      categoriesItems(result.data);
    })
    .catch((error) => console.log(error));

  function renderSubCategoriesList(value) {
    let subCategoriesList = "";

    value.forEach((item) => {
      subCategoriesList += `
                        <a
                          href="#"
                          class="list-group-item list-group-item-action active"
                          >${item.name} <small class="text-muted">(50)</small></a
                        >
        `;
    });
    return subCategoriesList;
  }

  function categoriesItems(value) {
    categoriesContainer.innerHTML = "";

    value.forEach((categories) => {
      let subCategories = categories.sub_categories;

      categoriesContainer.innerHTML += `<div
                  class="list-group list-group-collapse list-group-sm list-group-tree"
                  id="list-group-men"
                  data-children=".sub-men"
                >
                  <div class="list-group-collapse sub-men">
                    <a
                      class="list-group-item list-group-item-action"
                      href="#${categories.name.toLowerCase() + categories.id}"
                      data-toggle="collapse"
                      aria-expanded="true"
                      aria-controls="${
                        categories.name.toLowerCase() + categories.id
                      }"
                      >${categories.name}
                        <small class="text-muted">(${
                          categories.sub_categories_count
                        })
                        </small>
                    </a>
                    <div
                      class="collapse"
                      id="${categories.name.toLowerCase() + categories.id}"
                      data-parent="#list-group-men"
                    ><div class="list-group">
                      ${renderSubCategoriesList(subCategories)}
                      </div>
                    </div>
                  </div>
                </div>`;
    });
  }
}
categoriesList();


console.log("currentUrl");