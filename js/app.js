const loadProducts = () => {
  const url = `https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h4><b>${product.title.slice(0,20) }</b></h4>
      <h5>Category: ${product.category}</h5>
      <p class= "icon">
          <i class="fas fa-star filled"></i><i class="fas fa-star filled"></i><i class="fas fa-star filled"></i><i class="fas fa-star filled"></i><i class="fas fa-star-half-alt"></i><span> <b>${product.rating.rate}</b></span>
      </p>
      <p class= "rating">
      <a href=""><b>${product.rating.count}<span> Ratings</span></b></a>
      </p>
      <h3><b>Price: $ ${product.price}</b></h3>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now ">Add to cart</button>
      <button id="details-btn" class="detail-btn">Details</button>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge(id);
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = Math.abs(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = (value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");

  if (priceConverted > 0) {
    setInnerText("delivery-charge", 20);
    setInnerText("total-tax", priceConverted * 0.2);
    updateTotal();
  }
    if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
    updateTotal();
  }
    if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
    updateTotal();
  }
    if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
    updateTotal();
  }
  
  
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = parseFloat(grandTotal).toFixed(2);
  
};