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
let basket = JSON.parse(localStorage.getItem("basket")) || [];

function removeItemFromCart(productId) {
  let temp = cart.filter((item) => item.id != productId);
  localStorage.setItem("cart", JSON.stringify(temp));
  localStorage.setItem("basket", JSON.stringify(temp));
  
  document.querySelector(".tbody").innerText = "";
  window.location.reload();
}

let increment = (id) => {
  let selectedItem = id;

  let search = basket.find((x) => x.id === selectedItem);

  if (search === undefined) {
    basket.push({
      id: selectedItem,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  getTotal();

  localStorage.setItem("basket", JSON.stringify(basket));

  // console.log(basket);
  update(selectedItem);
};
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem);

  if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  localStorage.setItem("basket", JSON.stringify(basket));
  
  // console.log(basket);
  
  getTotal();
  update(selectedItem);
};

let update = (id, price) => {
  let search = basket.find((x) => x.id === id);

  console.log("merge da ma dracu");
  console.log(search.price);
  document.getElementById(id).innerHTML = search.item;

};
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
    <button onclick = "decrement(${product.id})" class = "fa-solid fa-minus text-warning" data-product-id=${product.id}></button>
    <div id = ${product.id} class = "quantity-value">0</div>
    <button onclick = "increment(${product.id})" class = "fa-solid fa-plus  w-30 text-warning" data-product-id=${product.id}></button>
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

// let TotalAmount = () => {
//   if(basket.length !== 0 ){
//     let amount = basket.map((x) =>{
//       let {item , id} = x;
//       let search = products.find((y) => y.id === id) || [];

//       return item * search.price;

//     })
//     console.log(amount);
//   }
//   else return;
// }

// TotalAmount();

function getTotal() {
  let quantity = JSON.parse(localStorage.getItem("basket"));
  let temp2 = quantity.map((basket) => {
    return parseFloat(basket.item);
  });
  let quantity2 = temp2.reduce((prev, next) => {
    return next + prev
  });
  let temp = cart.map((item) => {
    return parseFloat(item.price);
  }, 0);
  let sum = temp.reduce(function (prev, next) {
    return prev + next * temp2 ;
  }, 0);

  document.querySelector(
    ".total-price"
  ).innerHTML = `<h1 class="text-dark total-price">Total price: <span class="text-warning">$${sum}</span></span></h1> `;
}
