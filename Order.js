let cartContainer = document.querySelector(".cart_container_two")
let billContainer = document.querySelector(".cart_container_three")
let cartProducts = getCartItems()
function displayCartProducts() {
  cartProducts = getCartItems()
  cartContainer.innerHTML = ""
  if (cartProducts.length == 0) {
    billContainer.innerHTML = ""
    cartContainer.innerHTML = `
    <h2>Your Cart is Empty 🛒</h2>
    <a href="./Products.html">Browse Products</a>
    `
    return
  }
  cartProducts.forEach((item) => {
    let totalPrice = Math.round(item.qty * item.price)
    cartContainer.innerHTML += `
      <div class="cart_item">
        <aside class="cart_item_one">
          <img src=${item.img} alt=${item.title}>
        </aside>
        <aside class="cart_item_two">
          <h2 class="item_title">${item.title}</h2>
          <p class="item_qty">Qty: ${item.qty}</p>
          <p class="item_price">Price: $${totalPrice}</p>
        </aside>
        <aside class="cart_item_three">
          <i class="fa-regular fa-trash-can delete-btn" data-id=${item.id}></i>
        </aside>
      </div>
    `
  })
  deleteProduct()
  billInfoDetails()
  buyNowEvent()
}
displayCartProducts()

function deleteProduct() {
  let deleteBtns = document.querySelectorAll(".delete-btn")

  deleteBtns.forEach((button) => {
    button.addEventListener("click", () => {

      let ProductId = Number(button.dataset.id)

      cartProducts = cartProducts.filter((item) => {
        return item.id !== ProductId
      })

      saveCartItems(cartProducts)

      updateCartCount();   // <-- Add this line

      displayCartProducts()
    })
  })
}
deleteProduct()

function billInfoDetails() {
  cartProducts = getCartItems()
  let itemTotal = 0
  cartProducts.forEach((item) => {
    itemTotal += item.qty*item.price
  })
  let deliveryCharges = itemTotal >= 100 ? 0 : 10
  let platformFee = 5
  let discount = itemTotal >= 100 ? 15 : 0
  let grandTotal = itemTotal + deliveryCharges + platformFee - discount
  billContainer.innerHTML = `
        <div class="billing_details">
        <h3>Bill Details</h3>
        <div class="billing_info">
          <p>Item Total (${cartProducts.length})</p>
          <p>$${itemTotal}</p>
        </div>
        <div class="billing_info">
          <p>Delivery Charges</p>
          <p>$${deliveryCharges}</p>
        </div>
        <div class="billing_info">
          <p>Platform Fee</p>
          <p>$${platformFee}</p>
        </div>
        <div class="billing_info">
          <p>Discount</p>
          <p>$${discount}</p>
        </div>
        <div class="billing_info">
          <h3>Grand Total</h3>
          <h3>$${grandTotal}</h3>
        </div>
      </div>
      <button id="buyNowBtn">Buy Now</button>`
}

function buyNowEvent() {
  let buyNowBtn = document.getElementById("buyNowBtn")
  buyNowBtn.addEventListener("click", () => {
    let orderId = `#ZEP${Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000}`
    let estimatedTime = `${Math.floor(Math.random() * (10 - 5 + 1)) + 5} mins`
    alert(`
       Your Order Id is ${orderId},
       Your Order will be delivered within ${estimatedTime}      
      `)
    localStorage.clear("cartItems")
    updateCartCount();
    location.assign("./index.html")
  })
}