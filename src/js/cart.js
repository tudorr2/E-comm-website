fetch("https://63372212132b46ee0bddc50f.mockapi.io/product")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    localStorage.setItem("products", JSON.stringify(data));
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", "[]");
    }
  });

let products = JSON.parse(localStorage.getItem("products"));
let cart = JSON.parse(localStorage.getItem("cart"));

function removeItemFromCart(productId) {
  let temp = cart.filter((item) => item.id != productId);
  localStorage.setItem("cart", JSON.stringify(temp));
  document.querySelector(".tbody").innerText = "";
  window.location.reload();
}

// const quantityValue = document.querySelector("#quantity-product").value;

function updateQuantity(productId, quantityProd) {
  for (let product of cart) {
    if (product.id == productId) {
      product.quantity = quantityProd;
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}
function getTotal(event) {
  let temp = cart.map(function (item) {
    return parseFloat(item.price);
  });
  let sum = temp.reduce(function (prev, next) {
    return prev + next;
  }, 0);

  document.querySelector(
    ".totalPrice"
  ).innerHTML = `<h1>Total Price: <span class="text-warning">$${sum}</span></h1>`;
}
getTotal();

//make rows

const loadCart = () => {
  let cart = JSON.parse(localStorage.getItem("cart"));

  const createCardFromProduct = (product) => {
    return `<tr>
    <th scope="row">${index}</th>
    <td><img src="${product.img}" class = "cart-img"></td>
    <td><a href = "/../src/html/details.html?product_id=${product.id}" class = "text-warning text-decoration-none fw-bolder"> ${product.name}</a></td>
    <td><div class = "container quantity-form">
    <div class = "container quantity-input">
    <button class = "fa-solid fa-minus text-warning"></button>
    <input type = "text" class = "w-25" value = "${product.quantity}">
    <button class = "fa-solid fa-plus  w-30 text-warning"></button>
    </div>



    </div></td>
    <td>${product.price} $</td>
    <td><button onclick="removeItemFromCart(${product.id})" class = "btn btn-outline-warning delete-product"><i class="fa-solid fa-trash"></i></button></td>
    </tr>
    `;
  };

  // const createRowFromProduct = cart.map(createCardFromProduct);
  var index = 1;

  cart.forEach(async (productId) => {
    const result = await fetch(
      `https://63372212132b46ee0bddc50f.mockapi.io/product/${productId.id}`
    );
    const product = await result.json();
    const innerHTMLProduct = createCardFromProduct(product);
    index++;
    document.querySelector(".tbody").innerHTML += innerHTMLProduct;
  });
};

window.addEventListener("DOMContentLoaded", loadCart);

document.querySelector(".buy-btn").addEventListener("click", () => {
  alert("This is just a personal project👽");
});
