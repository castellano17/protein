// Toggle menú hamburguesa
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");
hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");
});

// Carrito
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Función para agregar al carrito
const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const card = button.closest(".card");
    const productId = card.getAttribute("data-id");
    const productName = card.querySelector("h3").textContent;
    const productPrice = card.querySelector(".price").textContent;
    const productImg = card.querySelector("img").getAttribute("src");

    cart.push({
      id: productId,
      name: productName,
      img: productImg,
      price: productPrice,
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
  });
});

// Función para actualizar el contador del carrito
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  cartCount.textContent = cart.length;
}

// Función para mostrar el carrito
const cartIcon = document.querySelector(".carrito");
const cartPopup = document.getElementById("cart-popup");
const cartItemsContainer = document.getElementById("cart-items");

cartIcon.addEventListener("click", function () {
  // Mostrar el carrito
  cartPopup.style.display = "block";

  cartItemsContainer.innerHTML = "";

  cart.forEach((product) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h4>${product.name}</h4>
       <p>${product.price}</p> 
    `;
    cartItemsContainer.appendChild(cartItem);
  });
});

window.addEventListener("click", function (e) {
  if (e.target === cartPopup) {
    cartPopup.style.display = "none";
  }
});

// Cerrar el carrito  la "X"al hacer clic en
const closeCartButton = document.getElementById("close-cart");
closeCartButton.addEventListener("click", function () {
  cartPopup.style.display = "none";
});

// Función para vaciar el carrito al hacer clic en "Pagar"
const payButton = document.getElementById("checkout-btn");

payButton.addEventListener("click", function () {
  localStorage.removeItem("cart");
  cart = [];

  updateCartCount();

  cartItemsContainer.innerHTML = "";

  cartPopup.style.display = "none";

  alert("¡Compra realizada con éxito!");
});

// Inicializar el contador del carrito al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});
