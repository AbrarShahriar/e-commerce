import { fetchProducts, fetchCategories } from "./fetch.js";
import nodes, { layoutNodes } from "./nodes.js";
import ProductCard from "./components/ProductCard.js";
import { setData, getData } from "./cache.js";
import { capitalizeString } from "./helper.js";

for (const key in layoutNodes) {
  if (Object.prototype.hasOwnProperty.call(layoutNodes, key)) {
    layoutNodes[key].style.display = "none";
  }
}
document.body.style.height = `100vh`;
document.body.style.width = `100vw`;

fetchProducts().then((products) => {
  setData(products);

  products.forEach((product, i) => {
    showAllProducts(product);
  });

  fetchCategories().then((categories) => {
    nodes.loader.style.display = "none";
    for (const key in layoutNodes) {
      if (Object.prototype.hasOwnProperty.call(layoutNodes, key)) {
        layoutNodes[key].style.display = "block";
      }
    }
    document.body.style.height = `100%`;
    document.body.style.width = `100%`;

    // FILTER CATEGORY //
    categories.forEach((category) => {
      nodes.filter_category.innerHTML += `<option value="${category}">${capitalizeString(
        category
      )}</option>`;
    });

    let cachedData = getData();
    nodes.filter_category.addEventListener("change", (e) => {
      e.preventDefault();
      e.stopPropagation();

      let userChoosenCategory = e.target.value;

      if (userChoosenCategory == "all") {
        nodes.productsDiv.innerHTML = null;
        cachedData.forEach((product) => {
          showAllProducts(product);
        });
      } else {
        let filteredProducts = cachedData.filter(
          (product, i) => product.category === userChoosenCategory
        );
        showFilteredProducts(filteredProducts);
      }
    });
  });

  // FILTER RATING //

  nodes.filter_rating.addEventListener("change", (e) => {
    e.preventDefault();
    e.stopPropagation();

    let userChoosenRating = e.target.value;

    if (userChoosenRating == "all") {
      nodes.productsDiv.innerHTML = null;
      getData().forEach((product) => {
        showAllProducts(product);
      });
    } else {
      let filteredProducts = getData().filter(
        (product, i) => product.rating.rate >= parseFloat(userChoosenRating)
      );
      showFilteredProducts(filteredProducts);
    }
  });

  // FILTER PRICE //
  nodes.btn_apply.addEventListener("click", (e) => {
    let min = parseFloat(nodes.filter_price_min.value);
    let max = parseFloat(nodes.filter_price_max.value);

    let cachedData = getData();

    let filteredProducts = [];

    if (!max && !min) {
      nodes.productsDiv.innerHTML = null;
      cachedData.forEach((product) => {
        showAllProducts(product);
      });
      return;
    }

    if (!max) {
      filteredProducts = cachedData.filter((product) => product.price > min);
    } else if (!min) {
      filteredProducts = cachedData.filter((product) => product.price < max);
    } else if (max && min) {
      filteredProducts = cachedData.filter(
        (product) => product.price > min && product.price < max
      );
    }

    showFilteredProducts(filteredProducts);
  });
});

// RENDER FUNCTIONS //

function showAllProducts(product) {
  nodes.productsDiv.append(
    ProductCard({
      id: product.id,
      image: product.image,
      title: product.title,
      description: product.description,
      price: product.price,
      rating: product.rating.rate,
    })
  );
}

function showFilteredProducts(filteredProductsArray) {
  nodes.productsDiv.innerHTML = null;
  filteredProductsArray.forEach((product) => {
    nodes.productsDiv.append(
      ProductCard({
        id: product.id,
        image: product.image,
        title: product.title,
        description: product.description,
        price: product.price,
        rating: product.rating.rate,
      })
    );
  });
}
