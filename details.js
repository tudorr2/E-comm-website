const showProductDetails = async () => {
	const searchParamString = window.location.search;

	const searchParams = new URLSearchParams(searchParamString);

	const productId = searchParams.get('product_id');

	
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
			<h5 class="card-title text-warning mb-3">${productInfo.name}</h5>
			<p class="card-text">${productInfo.descr}.</p>
			<h5 class="card-title text-warning mt-4">${productInfo.price}$</h5>
			<button id=${productInfo.id} class="btn btn-outline-warning mt-2 add-to-cart">Add to cart</button>
			
		  </div>
		</div>
	  </div>
	</div>
 </div>
   `;

	document.querySelector('.product-details').innerHTML = productCardDetails;
};

window.addEventListener('DOMContentLoaded', showProductDetails);

const addProductToCart = async (id) => {
	let products = JSON.parse(localStorage.getItem('products'));
	if (products == null) products = [];
	products.push(id);

	localStorage.setItem('products', JSON.stringify(products));
};

const handleActions = (event) => {
	if (event.target.classList.contains('add-to-cart')) {
		const productId = event.target.id;
		addProductToCart(productId);
	}
};

document
	.querySelector('.product-details')
	.addEventListener('click', handleActions);