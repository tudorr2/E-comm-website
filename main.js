//api https://63372212132b46ee0bddc50f.mockapi.io/product

const createCardFromProduct = (product) => {
  return `<div class="card text-light mb-3 mt-3  product-card" style="width: 18rem;">
	
	<a href="./details.html?product_id=${product.id}" class="card-img-top "><img src="${product.img}" class="card-img-top" alt="productimg"></a>
	<div class="card-body">
	  <a href="./details.html?product_id=${product.id}" class="card-title a-main">
	  <h5 class="card-title mb-2 text-light">${product.name}</h5></a>
	  <h5 class="card-title mb-3">${product.price}$</h5>
    <a href="./details.html?product_id=${product.id}" class="btn btn-dark btn-outline-light btn-card btn-details">See details</a>

	</div>
  </div>`;
}; // create cards

// <a href="#" class="btn btn-primary ms-4 btn-card">See details</a> see details btn

const getProductsOnIndexPage = () => {
  fetch("https://63372212132b46ee0bddc50f.mockapi.io/product")
    .then((result) => result.json())
    .then((products) => {
      const productCards = products.map((product) =>
        createCardFromProduct(product)
      );
      const innerHTMLProducts = productCards.join("");
      document.querySelector(".products-container").innerHTML =
        innerHTMLProducts;
    });
};

window.addEventListener("DOMContentLoaded", getProductsOnIndexPage);
