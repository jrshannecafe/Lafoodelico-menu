// ============ menu bar open close ============
let menu = document.querySelector('#menu_bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
}

// ============ search bar open close ============
window.onscroll = () => {
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');
}

document.querySelector('#search_icon').onclick = () => {
  document.querySelector('#search_form').classList.toggle('active');
}

document.querySelector('#close').onclick = () => {
  document.querySelector('#search_form').classList.remove('active');
}

// ============ cart section ============

const cartIcon = document.getElementById("cart-icon");
const cartSection = document.querySelector(".cart");
const closeCartIcon = document.getElementById("close_cart");

function openCart() {
  cartSection.style.transform = "translateX(0)";
}

function closeCart() {
  cartSection.style.transform = "translateX(100%)";
}

cartSection.style.transform = "translateX(100%)";

cartIcon.addEventListener("click", openCart);
closeCartIcon.addEventListener("click", closeCart);

// ============ add to cart toss animation section ============
function showAlert() {
  document.getElementById("alert-box").style.display = "block";
}

function hideAlert() {
  document.getElementById("alert-box").style.display = "none";
}

function submitDetails() {
  const name = document.getElementById("name").value;
  const contact = document.getElementById("contact").value;
  const table = document.getElementById("table").value;
  
  // do something with the details, such as send them to a server
  
  alert(`Thank you for your order, ${name}! 
Your contact number is ${contact} and 
your table number is ${table}.`);
  hideAlert();
}
 
function cancelDetails() {
  document.getElementById("name").value = "";
  document.getElementById("contact").value = "";
  document.getElementById("table").value = "";
  hideAlert();
}

// ============ add to cart section ============
const addToCartButtons = document.querySelectorAll(".cart-btn");

addToCartButtons.forEach(function (button) {
  button.addEventListener("click", addToCart);
});

function addToCart(event) {
  const button = event.target; 
  const box = button.closest(".box"); 

  const itemImg = box.querySelector("img").src; 
  const itemName = box.querySelector("h3").textContent; 
  const itemPrice = box.querySelector("span").textContent; 

  const cartItem = document.createElement("div");
  cartItem.classList.add("cart_box");
  cartItem.innerHTML = `
    <img src="${itemImg}" alt="" class="cart_img">
    <div class="cart_detail">
        <div class="cart_product_title">${itemName}</div>
        <div class="cart_price">${itemPrice}</div>
        <div class="cart_quantity">
        <span class="minus" onclick="decrementQuantity()">-</span>
        <span class="num" id="quantity">1</span>
        <span class="plus" onclick="incrementQuantity()">+</span>
      </div>
              
        <button class="cart_remove">Remove</button>
    </div>
  `;

  const cartContent = document.querySelector(".cart_content");

  cartContent.appendChild(cartItem);

  updateTotalPrice();

  const quantityInput = cartItem.querySelector(".cart_quantity");

  quantityInput.addEventListener("input", updateCartItemTotal);

  const removeButton = cartItem.querySelector(".cart_remove");

  removeButton.addEventListener("click", removeFromCart);
}

function updateCartItemTotal(event) {
  const input = event.target; 
  const cartItem = input.closest(".cart_box"); 

  const priceElement = cartItem.querySelector(".cart_price");
  const price = parseFloat(priceElement.textContent.replace("₱", ""));
  const quantity = parseInt(input.value);
  const total = price * quantity;

  const totalElement = cartItem.querySelector(".cart_total");
  totalElement.textContent = `₱${total.toFixed(2)}`;

  updateTotalPrice();
}

function removeFromCart(event) {
  const button = event.target; 
  const cartItem = button.closest(".cart_box"); 

  cartItem.remove();

  updateTotalPrice();
}

function updateTotalPrice() {
  const cartItems = document.querySelectorAll(".cart_box");
  const totalPriceElement = document.querySelector(".total_price");

  let totalPrice = 0;

  cartItems.forEach(function(item) {
    const priceElement = item.querySelector(".cart_price");
    const price = parseFloat(priceElement.textContent.replace("₱", ""));
    const quantityElement = item.querySelector(".cart_quantity");
    const quantity = parseInt(quantityElement.value);
    totalPrice += price * quantity;
  });

  totalPriceElement.textContent = `₱${totalPrice.toFixed(2)}`;
}

// ============increment and decrement quantity ============
function incrementQuantity() {
  var quantityElement = document.getElementById("quantity");
  var quantity = parseInt(quantityElement.innerHTML);
  quantity++;
  quantityElement.innerHTML = quantity;
}

function decrementQuantity() {
  var quantityElement = document.getElementById("quantity");
  var quantity = parseInt(quantityElement.innerHTML);
  if (quantity > 1) {
    quantity--;
    quantityElement.innerHTML = quantity;
  }
}

// ============ home section swiper ============
const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
var swiper = new Swiper(".home_slider", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  loop: true,
  on: {
    autoplayTimeLeft(s, time, progress) {
      progressCircle.style.setProperty("--progress", 1 - progress);
      progressContent.textContent = `${Math.ceil(time / 1000)}s`;
    }
  }
});

