const shop_categories_list = document.getElementById("shop_categories_list");

function shop_categories_nav(value) {
  let cathtml = "";
  value.forEach((element, index) => {
    let showcat = index == 0 ? "show" : "";
    console.log(element);
    let c_Name = "categoriesId" + element.name.toLowerCase();

    cathtml += `
    <div class="list-group-collapse sub-men">
                    <a
                      class="list-group-item list-group-item-action list-group-item-main-cott"
                      href=#${c_Name}
                      data-toggle="collapse"
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
                          href="#"
                          class="list-group-item list-group-item-action ${activeId}"
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
}

function getCategories_shop() {
  callApi("categories", "GET", null, false)
    .then((result) => {
      shop_categories_nav(result.data);
    })
    .catch((error) => console.log(error));
}
getCategories_shop();
