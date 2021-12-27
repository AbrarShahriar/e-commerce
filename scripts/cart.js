import nodes from "./nodes.js";
import CartItem from "./components/CartItem.js";
import { getData } from "./cache.js";

export let cart = [];

let totalItems = 0;
let price = 0;

export function add(id) {
  let foundProduct = getData().find((product) => product.id === id);

  let indexOfFoundItem = null;
  let itemAlreadyInCart = cart.find((item, i) => {
    indexOfFoundItem = i;
    return item.id === id;
  });

  if (itemAlreadyInCart) {
    cart[indexOfFoundItem].total = cart[indexOfFoundItem].total + 1;
  } else {
    cart.push({
      id: foundProduct.id,
      title: foundProduct.title,
      image: foundProduct.image,
      price: foundProduct.price,
      total: 1,
    });
  }
  price += foundProduct.price;
  totalItems++;

  updateCartUI("add");
}

export function remove(index, id) {
  let removedItem = cart.slice(index, index + 1)[0];

  let itemAlreadyInCart = cart.find((item) => item.id === id);

  if (itemAlreadyInCart) {
    if (removedItem.total > 1) {
      cart[index].total = cart[index].total - 1;
    } else {
      cart.splice(index, 1);
    }
  }

  price -= removedItem.price;
  totalItems--;
  updateCartUI("remove");
}

function updateCartUI(act) {
  if (cart.length <= 0) {
    nodes.cart_itemsDiv.innerHTML = "Cart is empty";
  } else {
    nodes.cart_itemsDiv.innerHTML = null;
    cart.forEach((item, i) => {
      nodes.cart_itemsDiv.append(
        CartItem({
          id: item.id,
          title: item.title,
          image: item.image,
          price: item.price,
          index: i,
          total: item.total,
        })
      );
    });
  }
  nodes.total_numberSpan.textContent = totalItems;
  nodes.totalSpan.innerText = `${Math.round(price)}$`;
}
