// src/components/CartItem.jsx

import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import styled from "styled-components";

const CartItemContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 8px;
`;

const ItemInfo = styled.div`
  margin-left: 16px;
`;

const ItemName = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const ItemPrice = styled.p`
  font-size: 16px;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

const QuantityButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 4px;
`;

const QuantityInput = styled.input`
  width: 40px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px;
`;

const CartItem = ({ data }) => {
  const { id, name, price, image } = data;
  const { cartItems, updateCartItemCount } = useContext(ShopContext);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    updateCartItemCount(newQuantity, id);
  };

  return (
    <CartItemContainer>
      <ItemImage src={image} alt={name} />
      <ItemInfo>
        <ItemName>{name}</ItemName>
        <ItemPrice>${price}</ItemPrice>
        <QuantityControl>
          <QuantityButton onClick={() => updateCartItemCount(cartItems[id] - 1, id)}>
            -
          </QuantityButton>
          <QuantityInput
            type="number"
            min="0"
            value={cartItems[id]}
            onChange={handleQuantityChange}
          />
          <QuantityButton onClick={() => updateCartItemCount(cartItems[id] + 1, id)}>
            +
          </QuantityButton>
        </QuantityControl>
      </ItemInfo>
    </CartItemContainer>
  );
};

export default CartItem;
