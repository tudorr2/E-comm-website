const loadProducts = () => {
	const productIds = JSON.parse(localStorage.getItem('products'));

	console.log(productIds);

	const products = [];

	const createCardFromProduct = (product) => {
		return `<tr>
        <th scope="row">${product.id}</th>
        <td><img src="${product.img}" class = "cart-img"></td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td><button class = "btn btn-outline-warning"><i class="fa-solid fa-trash"></i></button></td>

      </tr>
  `;
	};

	productIds.forEach(async (productId) => {
		const result = await fetch(
			`https://63372212132b46ee0bddc50f.mockapi.io/product/${productId}`
		);

		const product = await result.json();
		const innerHTMLProduct = createCardFromProduct(product);

		document.querySelector('.tbody').innerHTML += innerHTMLProduct;
	});
};

window.addEventListener('DOMContentLoaded', loadProducts);
