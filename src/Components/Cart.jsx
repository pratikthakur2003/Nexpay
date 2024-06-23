import React from 'react';
import styled from 'styled-components';

const CartContainer = styled.div`
  padding: 2rem;
`;

const Cart = () => {
  // Here you would normally fetch cart data from a state or context
  const cartItems = [
    { id: 1, name: 'Sneaker 1', price: 100, quantity: 1 },
    { id: 2, name: 'Sneaker 2', price: 120, quantity: 2 },
  ];

  return (
    <CartContainer>
      <h2>Your Cart</h2>
      {cartItems.map(item => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
    </CartContainer>
  );
};

export default Cart;
