import { create, truncateText } from "../helper.js";
import { add } from "../cart.js";

export default function ProductCard({
  id,
  image,
  title,
  description,
  price,
  rating,
}) {
  const product_card = create("div");
  product_card.className = "product_card";

  const img = create("img");
  img.src = image;

  const details = create("div");
  details.className = "details";

  const strong = create("strong");
  strong.textContent = title;

  const p = create("p");
  p.textContent = truncateText(description, 10);

  const price_rating_add = create("div");
  price_rating_add.className = "price_rating_add";

  const iTagIcon = create("i");
  iTagIcon.className = "fa fa-tag";

  const spanForPrice = create("span");
  spanForPrice.textContent = `${price}$`;

  const spanForRating = create("span");
  spanForRating.textContent = rating;

  const iStarIcon = create("i");
  iStarIcon.className = "fa fa-star";

  const iCartAddIcon = create("i");
  iCartAddIcon.className = "fa fa-cart-plus cart_add";
  iCartAddIcon.addEventListener("click", () => add(id));

  price_rating_add.append(iTagIcon);
  price_rating_add.append(spanForPrice);
  price_rating_add.append(iStarIcon);
  price_rating_add.append(spanForRating);
  price_rating_add.append(iCartAddIcon);

  details.append(strong);
  details.append(p);
  details.append(price_rating_add);

  product_card.append(img);
  product_card.append(details);

  return product_card;

  // transformed this template to javascript

  //      <div class="product_card">
  //          <img src="ehh_song.webp" alt="" />
  //          <div class="details">
  //            <strong>Lorem ipsum dolor sit</strong>
  //            <p>Lorem ipsum dolor sit amet consectetur...</p>
  //            <div class="price_rating_add">
  //              <i class="fa fa-tag"></i>
  //              <span>29.99$</span>
  //              <i class="fa fa-star"></i>
  //              <span>4.7</span>
  //              <i class="fa fa-cart-plus cart_add"></i>
  //            </div>
  //          </div>
  //      <div>
}
