const loadProducts = () => {
	const productIds = JSON.parse(localStorage.getItem('products'));

	console.log(productIds);

	const products = [];

	const createCardFromProduct = (product) => {
		return `<table class="table table-hover table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product</th>
            <th scope="col">Name</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">${product.id}</th>
            <td>Mark</td>
            
          </tr>
        
        </tbody>
      </table>`;
	};

	productIds.forEach(async (productId) => {
		const result = await fetch(
			`https://63372212132b46ee0bddc50f.mockapi.io/product/${productId}`
		);

		const product = await result.json();
		const innerHTMLProduct = createCardFromProduct(product);

		document.querySelector('.products-container').innerHTML += innerHTMLProduct;
	});
};

window.addEventListener('DOMContentLoaded', loadProducts);
