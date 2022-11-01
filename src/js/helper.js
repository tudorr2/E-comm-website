export const showConfirmationMessage = (className, response, message) => {
  const messageContainer = document.querySelector("." + className);
  messageContainer.classList.remove("success");
  messageContainer.classList.remove("error");
  messageContainer.classList.remove("hidden");

  if (!response.ok) {
    messageContainer.innerHTML = "Something went wrong!";
    messageContainer.classList.add("error");
  } else {
    messageContainer.innerHTML = message;
    messageContainer.classList.add("success");
  }

  setTimeout(() => {
    messageContainer.classList.add("hidden");
  }, 3000);
};

const PRODUCTS_URL = "https://63372212132b46ee0bddc50f.mockapi.io/product/";

export const getAllProducts = async () => {
  const result = await fetch(PRODUCTS_URL);
  const products = await result.json();

  return products;
};

export const getProductById = async (id) => {
  const result = await fetch(PRODUCTS_URL + id);
  const product = await result.json();

  return product;
};

export const postNewProduct = async (product) => {
  const response = await fetch(PRODUCTS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  return response;
};

export const deleteProductById = async (id) => {
  const response = await fetch(PRODUCTS_URL + id, {
    method: "DELETE",
  });

  return response;
};

export const putNewProduct = async (id , product) => {
  
  const response = await fetch(PRODUCTS_URL + id, {
    method: "PUT",
    headers: {
      "Content-Type": "aplication/json",
    },
   
    body: JSON.stringify(product),
  });
  

  return response;
};
