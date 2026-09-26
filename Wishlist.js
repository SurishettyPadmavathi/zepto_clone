const WISHLIST_KEY = "wishlistItems";

function getWishlist() {
  return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
}

function saveWishlist(items) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
}

function isWishlist(id) {
  return getWishlist().some((item) => item.id === id);
}

function toggleWishlist(product) {
  let items = getWishlist();
  let index = items.findIndex((item) => item.id === product.id);

  if (index == -1) {
    items.push(product);
  } else {
    items.splice(index, 1);
  }

  saveWishlist(items);
}

function displayWishlistProducts() {
  let wishlist = getWishlist();
  let container = document.getElementById("wishlist-container");

  if (wishlist.length === 0) {
    container.innerHTML = `
      <h2 style="text-align:center;margin-top:100px">
        Wishlist is Empty ❤️
      </h2>
    `;
    return;
  }

  container.innerHTML = wishlist
    .map((item) => {
      return `
        <div class="product-card">
          <img src="${item.img}" alt="">
          <h3>${item.title}</h3>
          <h2>₹${item.price}</h2>
          <button class="remove-btn" data-id="${item.id}">Remove</button>
          <button class="move-cart" data-id="${item.id}">Move to Cart</button>
        </div>
      `;
    })
    .join("");

  removeWishlistProduct();
  moveToCart();
}

function removeWishlistProduct() {
  let buttons = document.querySelectorAll(".remove-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      let id = Number(button.dataset.id);
      let wishlist = getWishlist();

      wishlist = wishlist.filter((item) => item.id !== id);
      saveWishlist(wishlist);
      displayWishlistProducts();
    });
  });
}

function moveToCart() {
  let buttons = document.querySelectorAll(".move-cart");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      let id = Number(button.dataset.id);
      let wishlist = getWishlist();
      let product = wishlist.find((item) => item.id === id);

      addToCart(product);

      wishlist = wishlist.filter((item) => item.id !== id);
      saveWishlist(wishlist);
      displayWishlistProducts();
      updateCartCount();
    });
  });
}

displayWishlistProducts();
moveToCart();