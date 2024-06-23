const cartReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_CART":
        const { id, color, amount, product } = action.payload;
        const newItem = {
          id: id,
          name: product.name,
          color: color,
          amount: amount,
          image: product.image,
          price: product.price,
          quantity: 1,
        };
  
        return {
          ...state,
          cart: [...state.cart, newItem],
          total_items: state.total_items + 1,
          total_amount: state.total_amount + newItem.price,
        };
  
      case "REMOVE_ITEM":
        const filteredCart = state.cart.filter((item) => item.id !== action.payload);
        const removedItem = state.cart.find((item) => item.id === action.payload);
  
        return {
          ...state,
          cart: filteredCart,
          total_items: state.total_items - 1,
          total_amount: state.total_amount - removedItem.price,
        };
  
      case "CLEAR_CART":
        return {
          ...state,
          cart: [],
          total_items: 0,
          total_amount: 0,
        };
  
      default:
        return state;
    }
  };
  
  export default cartReducer;
  