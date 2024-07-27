const cartValue = document.querySelector("#cartValue");

export const updateCartValue = (cartProductsLength) => {
    return (cartValue.innerHTML = `<i class="fa-solid fa-cart-shopping"> ${cartProductsLength} </i>`);
};