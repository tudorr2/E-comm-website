import {
  postNewProduct,
  getAllProducts,
  deleteProductById,
  putNewProduct,
} from "./helper.js";
import { showConfirmationMessage } from "./helper.js";

const imageInputElement = document.querySelector(".add-product-form #image");
const nameInputElement = document.querySelector(".add-product-form #name");
const descriptionInputElement = document.querySelector(
  ".add-product-form #description"
);
const quantityInputElement = document.querySelector(
  ".add-product-form #quantity"
);
const priceInputElement = document.querySelector(".add-product-form #price");
const categoryInputElement = document.querySelector(
  ".add-product-form #category"
);

const populateProductsTable = async () => {
  const products = await getAllProducts();
  console.log(products);

  const tableContent = products
    .map(
      (product, index) =>
        `<tr >
			<th scope="row">${index + 1}</th>
			<td class = "name-value">${product.name}</td>
			<td><img src="${product.img}" class="img-value" width="50" height="50"></td>
			<td class = "price-value">${product.price}</td>
			<td data-id=${product.id}>
				<button id="${product.id}" class="btn btn-danger">
					<i class="fa-regular fa-trash-can"></i>
				</button>
        </td>
        <td data-id=${product.id}>
				<button  class="btn btn-warning btn-edit" id=" ${product.id}">
					<i class="fa-solid fa-pencil"></i>
				</button>
			</td>
		</tr>`
    )
    .join("");

  document.getElementById("products-table-body").innerHTML = tableContent;
};
window.addEventListener("DOMContentLoaded", populateProductsTable);

const addProduct = async () => {
  const product = {
    name: nameInputElement.value,
    img: imageInputElement.value,
    descr: descriptionInputElement.value,
    price: priceInputElement.value,
    quantity: quantityInputElement.value,
    category: categoryInputElement.value,
  };

  const response = await postNewProduct(product);
  showConfirmationMessage(
    "add-product-message",
    response,
    "Produsul a fost adaugat cu succes!"
  );
};

document.getElementById("add-product").addEventListener("click", addProduct);

// document.getElementById("add-new-product").addEventListener("click", () => {
//   document.querySelector(".add-product-container").classList.toggle("hidden");
// });

// document.querySelector(".cancel-btn").addEventListener("click", () => {
//   document.querySelector(".add-product-container").classList.toggle("hidden");
// });

const handleProducts = async (event) => {
  //delete product
  if (event.target.classList.contains("fa-trash-can")) {
    const productId = event.target.parentNode.id;
    console.log(productId);
    const response = await deleteProductById(productId);
    if (response.ok) {
      await populateProductsTable();
    }
  } 
  //put product
  if (event.target.classList.contains("fa-pencil")) {
    let imageInputElement = document.querySelector(
      ".add-product-form #image"
    );
    let nameInputElement = document.querySelector(".add-product-form #name");
    let descriptionInputElement = document.querySelector(
      ".add-product-form #description"
    );
    let quantityInputElement = document.querySelector(
      ".add-product-form #quantity"
    );
    let priceInputElement = document.querySelector(
      ".add-product-form #price"
    );
    let categoryInputElement = document.querySelector(
      ".add-product-form #category"
    );
    const parent = event.target.parentNode.parentNode.parentNode;
    console.log(parent);
    const nameValue = parent.querySelector(".name-value").textContent;
    nameInputElement.value = nameValue;
    const imageValue = parent.querySelector(".img-value").textContent.toString();
    imageInputElement.value = imageValue;
    const priceValue = parent.querySelector(".price-value").textContent;
    priceInputElement.value = priceValue;
    

    
    console.log(imageValue)
    const productId = event.target.parentNode.id;
    console.log(productId);
    // const response2 = await putNewProduct(productId);
    // if(response2.ok){
    // }
  }
};

document
  .getElementById("products-list")
  .addEventListener("click", handleProducts);
