import { updateCartValue } from "./updateCartValue.js";

export const getCartProductFromLS = () =>{
    let cartProducts = localStorage.getItem("cartProductLS");
    if (!cartProducts){
        return [];
    }
    cartProducts = JSON.parse(cartProducts);
    // console.log(cartProducts.length);
    updateCartValue(cartProducts.length); 


    return cartProducts;
};