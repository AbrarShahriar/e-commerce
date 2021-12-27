import { select } from "./helper.js";

export const layoutNodes = {
  header: select("header"),
  content: select(".content"),
};

const nodes = {
  productsDiv: select(".products"),
  cart_itemsDiv: select(".cart_items"),
  total_numberSpan: select(".total_number > span"),
  totalSpan: select(".total > span"),
  filter_category: select(".filter_category"),
  filter_rating: select(".rating"),
  filter_price_min: select("#min"),
  filter_price_max: select("#max"),
  btn_apply: select(".btn_apply"),
  loader: select(".loader"),
};

export default nodes;
