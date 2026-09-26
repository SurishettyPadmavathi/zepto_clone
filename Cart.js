let CART_KEY = "cartItems"

function getCartItems() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || []
}

function saveCartItems(cartItems) {
  return localStorage.setItem(CART_KEY, JSON.stringify(cartItems))
}

function addToCart(product) {
  let cartItems = getCartItems()
  let existingProduct = cartItems.find((item) => {
    return item.id === product.id
  })
  if (existingProduct) {
    existingProduct.qty++
  } else {
    cartItems.push({
      id: product.id,
      title: product.title,
      qty: 1,
      price: product.price,
      img: product.img
    })
  }
  saveCartItems(cartItems)
  updateCartCount();
}

function incrementQuantity(productId) {
  let cartItems = getCartItems()
  let product = cartItems.find((item) => {
    return item.id === productId
  })
  if (product) {
    product.qty++
  }
  saveCartItems(cartItems)
  updateCartCount();
}

function decrementQuantity(productId) {
  let cartItems = getCartItems()
  let product = cartItems.find((item) => {
    return item.id === productId
  })
  if (product) {
    product.qty--
    if (product.qty === 0) {
      cartItems = cartItems.filter((item) => {
        return item.id !== productId
      })
    }
  }
  saveCartItems(cartItems)
  updateCartCount();
}

function getProductQuantity(productId) {
  let cartItems = getCartItems()
  let product = cartItems.find((item) => {
    return item.id === productId
  })
  if (product) {
    return product.qty
  }
  return 0
}

function updateCartCount() {
  let cartItems = getCartItems();
  let total = cartItems.reduce((sum, item) => {
    return sum + item.qty;
  }, 0);
  let badge = document.getElementById("cart-count");
  if (badge) {
    badge.innerText = total;
  }
}
updateCartCount();