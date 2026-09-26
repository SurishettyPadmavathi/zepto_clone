//!Fetch Address Functionality
let userLocation = document.getElementById("location")
userLocation.addEventListener("click", () => {
  userLocation.innerHTML = "Fetching Location..."
  navigator.geolocation.getCurrentPosition((position) => {
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude
    let locationApi = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=jsonv2`
    let fetchingArea = async () => {
      let response = await fetch(locationApi)
      let { address: { suburb, city } } = await response.json()
      userLocation.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${suburb}, ${city}`
    }
    fetchingArea()
  })
})

//!Category Thumbnails
let thumbnails = [
  {
    slug: "beauty",
    name: "Beauty",
    url: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
  },
  {
    slug: "fragrances",
    name: "Fragrances",
    url: "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/1.webp"
  },
  {
    slug: "furniture",
    name: "Furniture",
    url: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/1.webp"
  },
  {
    slug: "groceries",
    name: "Groceries",
    url: "https://cdn.dummyjson.com/product-images/groceries/apple/1.webp"
  },
  {
    slug: "home-decoration",
    name: "Home Decoration",
    url: "https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/1.webp"
  },
  {
    slug: "kitchen-accessories",
    name: "Kitchen Accessories",
    url: "https://cdn.dummyjson.com/product-images/kitchen-accessories/bamboo-spatula/1.webp"
  },
  {
    slug: "laptops",
    name: "Laptops",
    url: "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp"
  },
  {
    slug: "mens-shirts",
    name: "Mens Shirts",
    url: "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/1.webp"
  },
  {
    slug: "mens-shoes",
    name: "Mens Shoes",
    url: "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/1.webp"
  },
  {
    slug: "mens-watches",
    name: "Mens Watches",
    url: "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/1.webp"
  },
  {
    slug: "mobile-accessories",
    name: "Mobile Accessories",
    url: "https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-plus/1.webp"
  },
  {
    slug: "motorcycle",
    name: "Motorcycle",
    url: "https://cdn.dummyjson.com/product-images/motorcycle/generic-motorcycle/1.webp"
  },
  {
    slug: "skin-care",
    name: "Skin Care",
    url: "https://cdn.dummyjson.com/product-images/skin-care/attitude-super-leaves-hand-soap/1.webp"
  },
  {
    slug: "smartphones",
    name: "Smartphones",
    url: "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/1.webp"
  },
  {
    slug: "sports-accessories",
    name: "Sports Accessories",
    url: "https://cdn.dummyjson.com/product-images/sports-accessories/american-football/1.webp"
  },
  {
    slug: "sunglasses",
    name: "Sunglasses",
    url: "https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/1.webp"
  },
  {
    slug: "tablets",
    name: "Tablets",
    url: "https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/1.webp"
  },
  {
    slug: "tops",
    name: "Tops",
    url: "https://cdn.dummyjson.com/product-images/tops/blue-frock/1.webp"
  },
  {
    slug: "vehicle",
    name: "Vehicle",
    url: "https://cdn.dummyjson.com/product-images/vehicle/300-touring/1.webp"
  },
  {
    slug: "womens-bags",
    name: "Womens Bags",
    url: "https://cdn.dummyjson.com/product-images/womens-bags/blue-women's-handbag/1.webp"
  },
  {
    slug: "womens-dresses",
    name: "Womens Dresses",
    url: "https://cdn.dummyjson.com/product-images/womens-dresses/black-women's-gown/1.webp"
  },
  {
    slug: "womens-jewellery",
    name: "Womens Jewellery",
    url: "https://cdn.dummyjson.com/product-images/womens-jewellery/green-crystal-earring/1.webp"
  },
  {
    slug: "womens-shoes",
    name: "Womens Shoes",
    url: "https://cdn.dummyjson.com/product-images/womens-shoes/black-&-brown-slipper/1.webp"
  },
  {
    slug: "womens-watches",
    name: "Womens Watches",
    url: "https://cdn.dummyjson.com/product-images/womens-watches/rolex-datejust-women/1.webp"
  }
]

//! Fetching Categories
let fetchCategories = () => {
  let categoryItems = document.getElementById("category-items")
  thumbnails.forEach((category) => {
    categoryItems.innerHTML += `
      <div class="category-card">
         <div class="category-img">
           <img src=${category.url} alt=${category.slug} >
         </div>
         <p class="category-name">${category.name}</p>
       </div> 
     `
  })
}
fetchCategories()

//!Individual Category
let categoryCards = document.querySelectorAll(".category-card")
categoryCards.forEach((card) => {
  card.addEventListener("click", () => {
    let categoryName = card.querySelector("img").alt
    sessionStorage.setItem("clickedCategory", categoryName)
    fetchingIndividualCategoryData()
    setTimeout(() => {
      location.assign("./Category.html")
    },2000)
  })
})

async function fetchingIndividualCategoryData() {
  let categoryName = sessionStorage.getItem("clickedCategory")
  let response = await fetch(`https://dummyjson.com/products/category/${categoryName}`)
  let { products } = await response.json()
  localStorage.setItem("clickedCategoryData", JSON.stringify(products))
}