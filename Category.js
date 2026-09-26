//!Fetching Individual Category Data
let categoryDatas = JSON.parse(localStorage.getItem("clickedCategoryData"));
let categoryName = sessionStorage.getItem("clickedCategory");

let categoryImage = categoryDatas[0].thumbnail;
let headerOne = document.getElementById("header-one");
headerOne.innerHTML = `
  <img src="${categoryImage}" alt="${categoryName}" height="100" width="100">
`;

let headerTwo = document.getElementById("header-two");
headerTwo.innerHTML = `
  <h2>${categoryDatas[0].category.replace("-", " ")}</h2>
  <p>${categoryDatas.length} products . Delivered in 10 minutes</p>
`;

//!Displaying Category Items
let originalDatas = JSON.parse(localStorage.getItem("clickedCategoryData"));
let productDatas = [...originalDatas];
let sidebarTwo = document.getElementById("sidebar-two");

function displayingProducts(products) {
  sidebarTwo.innerHTML = "";

  products.forEach((item) => {
    let finalPrice = Math.ceil(item.price - (item.price * item.discountPercentage) / 100);
    let qty = getProductQuantity(item.id);

    sidebarTwo.innerHTML += `
      <article class="product-cards">
        <div class="product-card-one">
          <p class="discount-percentage">${item.discountPercentage}% Off</p>
          <img src="${item.thumbnail}" alt="${item.title}">
          <p class="wishlist">
            <i class="fa-solid fa-heart${isWishlist(item.id) ? " clicked" : ""}"
              data-id="${item.id}"
              data-title="${item.title}"
              data-img="${item.thumbnail}"
              data-price="${finalPrice}">
            </i>
          </p>
        </div>
        <div class="product-card-two">
          <p class="delivery-time">⚡ ${Math.floor(Math.random() * (10 - 5 + 1)) + 5}Mins</p>
          <p class="product-title">${item.title}</p>
          <p class="product-brand">${item.brand || "Imported"}</p>
          <div class="product-price">
            <p class="discount-price">$${finalPrice}</p>
            <p class="actual-price">$${item.price}</p>
            ${
              qty == 0
                ? `<button class="addBtn" data-id="${item.id}" data-price="${finalPrice}" data-qty="${qty}" data-title="${item.title}" data-img="${item.thumbnail}">Add</button>`
                : `
                  <div class="addBtnQtyContainer">
                    <button class="decrementBtn quantity-btn" data-id="${item.id}">-</button>
                    <span>${qty}</span>
                    <button class="incrementBtn quantity-btn" data-id="${item.id}">+</button>
                  </div>
                `
            }
          </div>
          <p class="ratings"><i class="fa-solid fa-star"></i> ${item.rating} (${item.stock})</p>
        </div>
      </article>
    `;
  });

  wishlistIcons();
  addButtonEvents();
  increaseButtonEvents();
  decreaseButtonEvents();
}

displayingProducts(productDatas);

//!Wishlist
function wishlistIcons() {
  let hearts = document.querySelectorAll(".wishlist i");

  hearts.forEach((heart) => {
    heart.addEventListener("click", () => {
      let product = {
        id: Number(heart.dataset.id),
        title: heart.dataset.title,
        img: heart.dataset.img,
        price: Number(heart.dataset.price),
      };

      toggleWishlist(product);
      heart.classList.toggle("clicked");
    });
  });
}

//!FILTER FUNCTIONALITY
let relevance = document.getElementById("relevance");
let priceAsc = document.getElementById("priceAsc");
let priceDesc = document.getElementById("priceDesc");
let discount = document.getElementById("discount");
let maxPriceAmount = document.querySelector("#max-price-heading>span");
let maxPrice = document.getElementById("max-price");
let inStock = document.getElementById("inStock");

function applyingFilters() {
  let filteredProducts = [...originalDatas];

  if (priceAsc.checked) {
    filteredProducts.sort(
      (a, b) =>
        Math.ceil(a.price - (a.price * a.discountPercentage) / 100) -
        Math.ceil(b.price - (b.price * b.discountPercentage) / 100)
    );
  } else if (priceDesc.checked) {
    filteredProducts.sort(
      (a, b) =>
        Math.ceil(b.price - (b.price * b.discountPercentage) / 100) -
        Math.ceil(a.price - (a.price * a.discountPercentage) / 100)
    );
  } else if (discount.checked) {
    filteredProducts.sort((a, b) => b.discountPercentage - a.discountPercentage);
  } else {
    filteredProducts = [...filteredProducts];
  }

  //*Price Range
  filteredProducts = filteredProducts.filter((item) => item.price <= maxPrice.value);

  //*In Stock
  if (inStock.checked) {
    filteredProducts = filteredProducts.filter((item) => item.stock > 0);
  }

  displayingProducts(filteredProducts);
}

relevance.addEventListener("change", applyingFilters);
priceAsc.addEventListener("change", applyingFilters);
priceDesc.addEventListener("change", applyingFilters);
discount.addEventListener("change", applyingFilters);
inStock.addEventListener("change", applyingFilters);

maxPrice.addEventListener("input", () => {
  maxPriceAmount.innerHTML = maxPrice.value;
  applyingFilters();
});

applyingFilters();

//!Add Button Events
function addButtonEvents() {
  let addBtns = document.querySelectorAll(".addBtn");

  addBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let product = {
        id: Number(btn.dataset.id),
        title: btn.dataset.title,
        price: Number(btn.dataset.price),
        img: btn.dataset.img,
      };

      addToCart(product);
      displayingProducts(productDatas);
    });
  });
}

//!Increase Button Events
function increaseButtonEvents() {
  let increaseBtns = document.querySelectorAll(".incrementBtn");

  increaseBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      incrementQuantity(Number(btn.dataset.id));
      displayingProducts(productDatas);
    });
  });
}

//!Decrease Button Events
function decreaseButtonEvents() {
  let decreaseBtns = document.querySelectorAll(".decrementBtn");

  decreaseBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      decrementQuantity(Number(btn.dataset.id));
      displayingProducts(productDatas);
    });
  });
}