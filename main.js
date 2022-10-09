//api https://63372212132b46ee0bddc50f.mockapi.io/product

const createCardFromProduct = (product) => {
	return `<div class='card'>
      <h3>${product.name}</h3>
      <img src='${product.img}' />
      <p>${product.price}</p>
   </div>`;
}; // create cards

const getProductsOnIndexPage = () => {
	fetch('https://63372212132b46ee0bddc50f.mockapi.io/product')
		.then((result) => result.json())
		.then((products) => {
			const productCards = products.map((product) =>
				createCardFromProduct(product)
			);
			const innerHTMLProducts = productCards.join('');
			document.querySelector('.products-container').innerHTML =
				innerHTMLProducts;
		});
};

window.addEventListener('DOMContentLoaded', getProductsOnIndexPage);