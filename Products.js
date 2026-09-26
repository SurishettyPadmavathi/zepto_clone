//!Fetch Address Functionality
let userLocation = document.getElementById("location");

userLocation.addEventListener("click", () => {
  userLocation.innerHTML = "Fetching Loaction...";

  navigator.geolocation.getCurrentPosition((position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let locationApi = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=jsonv2`;

    let fetchingArea = async () => {
      let response = await fetch(locationApi);
      let {
        address: { suburb, city },
      } = await response.json();

      userLocation.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${suburb}, ${city}`;
    };

    fetchingArea();
  });
});

//!Displaying All Products
let allProducts = [];

async function displayingProducts() {
  let response = await fetch("https://dummyjson.com/products?limit=194");
  let { products } = await response.json();

  allProducts = products;
  renderProducts(allProducts);

  let searchBar = document.querySelector("#products-section-1>input");
  searchBar.addEventListener("input", (e) => {
    let searchValue = e.target.value.trim().toLowerCase();
    let filteredProducts = allProducts.filter((item) =>
      item.title.trim().toLowerCase().includes(searchValue)
    );

    renderProducts(filteredProducts);
  });
}

displayingProducts();

function renderProducts(products) {
  let productsSection = document.getElementById("products-section-2");
  productsSection.innerHTML = "";

  products.forEach((item) => {
    let finalPrice = Math.ceil(item.price - (item.price * item.discountPercentage) / 100);
    let qty = getProductQuantity(item.id);

    productsSection.innerHTML += `
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
                ? `<button class="addBtn" data-id="${item.id}" data-title="${item.title}" data-price="${finalPrice}" data-img="${item.thumbnail}">Add</button>`
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

//!Refresh
function refreshProducts() {
  let searchBar = document.querySelector("#products-section-1 input");
  let searchValue = searchBar.value.trim().toLowerCase();
  let scrollPosition = window.scrollY;

  let filteredProducts = allProducts.filter((item) =>
    item.title.toLowerCase().includes(searchValue)
  );

  renderProducts(filteredProducts);

  searchBar = document.querySelector("#products-section-1 input");
  searchBar.value = searchValue;

  window.scrollTo({
    top: scrollPosition,
    behavior: "instant",
  });
}

//!Wishlist
function wishlistIcons() {
  let wishListIcons = document.querySelectorAll(".wishlist i");

  wishListIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      let product = {
        id: Number(icon.dataset.id),
        title: icon.dataset.title,
        img: icon.dataset.img,
        price: Number(icon.dataset.price),
      };

      toggleWishlist(product);
      icon.classList.toggle("clicked");
    });
  });
}

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
      refreshProducts();
    });
  });
}

//!Increase Button Events
function increaseButtonEvents() {
  let increaseBtns = document.querySelectorAll(".incrementBtn");

  increaseBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      incrementQuantity(Number(btn.dataset.id));
      refreshProducts();
    });
  });
}

//!Decrease Button Events
function decreaseButtonEvents() {
  let decreaseBtns = document.querySelectorAll(".decrementBtn");

  decreaseBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      decrementQuantity(Number(btn.dataset.id));
      refreshProducts();
    });
  });
}