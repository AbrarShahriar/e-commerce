import { remove } from "../cart.js";
import { create, truncateText } from "../helper.js";

export default function CartItem({ title, image, price, index, total, id }) {
  const cart_itemDiv = create("div");
  cart_itemDiv.className = "cart_item";

  const item_number = create("div");
  item_number.className = "item_number";
  item_number.innerText = total;

  const img = create("img");
  img.src = image;

  const details = create("div");
  details.className = "details";

  const strong = create("strong");
  strong.textContent = truncateText(title, 5);

  const price_rating_add = create("div");
  price_rating_add.className = "price_rating_add";

  const iTagIcon = create("i");
  iTagIcon.className = "fa fa-tag";

  const spanForPrice = create("span");
  spanForPrice.textContent = `${price}$`;

  const iCartRemoveIcon = create("i");
  iCartRemoveIcon.className = "fa fa-cart-arrow-down cart_remove";
  iCartRemoveIcon.addEventListener("click", () => remove(index, id));

  price_rating_add.append(iTagIcon);
  price_rating_add.append(spanForPrice);
  price_rating_add.append(iCartRemoveIcon);

  details.append(strong);
  details.append(price_rating_add);

  cart_itemDiv.append(item_number);
  cart_itemDiv.append(img);
  cart_itemDiv.append(details);

  return cart_itemDiv;
}

/* <div class="cart_item">
  <div class="item_number">6</div>
  <img src="ehh_song.webp" alt="" />
  <div class="details">
    <strong class="title">Lorem ipsum dolor sit amet.</strong>
    <div class="price_rating_add">
      <i class="fa fa-tag"></i>
      <span>29.99$</span>
      <i class="fa fa-cart-arrow-down cart_remove"></i>
    </div>
  </div>
</div>; */
