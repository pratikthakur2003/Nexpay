import products from "./api/products";
import { getCartProductFromLS } from "./getCartProduct.js";
let cartProduct = getCartProductFromLS();
let filterProducts = products.filter((curProd)=> {
    console.log(curProd.name);
});