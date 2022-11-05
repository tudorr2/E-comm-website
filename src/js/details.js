const showProductDetails = async () => {
  const searchParamString = window.location.search;

  const searchParams = new URLSearchParams(searchParamString);

  const productId = searchParams.get("product_id");

  const productURL = `https://63372212132b46ee0bddc50f.mockapi.io/product/${productId}`;
  const result = await fetch(productURL);
  const productInfo = await result.json();

  const productCardDetails = `
      <div>
	  <div class="card mb-3 mt-4 text-bg-dark product-det" >
	  <div class="row g-0">
		<div class="col-md-4">
		  <img src="${productInfo.img}" class="img-fluid rounded-start " alt="productimg ">
		</div>
		<div class="col-md-8">
		  <div class="card-body">
			<h5 class="card-title  mb-3">${productInfo.name}</h5>
			<p class="card-text">${productInfo.descr}.</p>
			<h5 class="card-title  mt-4 detail-price" >${productInfo.price}$</h5>
			<button id=${productInfo.id} class="btn btn-outline-light mt-2 add-to-cart btn-add-cart">Add to cart</button>
			
		  </div>
		</div>
	  </div>
	</div>
 </div>
   `;

  document.querySelector(".product-details").innerHTML = productCardDetails;
};

window.addEventListener("DOMContentLoaded", showProductDetails);
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



function addItemToCart(productId) {
  let product = products.find(function (product) {
    return product.id == productId;
  });

  if (cart.length == 0) {
    cart.push(product);
  } else {
    let res = cart.find((element) => element.id == productId);
    if (res === undefined) {
      cart.push(product);
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

const handleActions = (event) => {
  if (event.target.classList.contains("add-to-cart")) {
    const productId = event.target.id;
    addItemToCart(productId);
  }
};

document
  .querySelector(".product-details")
  .addEventListener("click", handleActions);

