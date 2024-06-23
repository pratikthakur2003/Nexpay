import React from 'react';
import styled from 'styled-components';
import ProductList from '../Components/ProductList';

const products = [
  { id: 1, name: 'Sneaker 1', price: 100, image: '/images/1.png' },
  { id: 2, name: 'Sneaker 2', price: 120, image: '/images/2.png' },
  { id: 3, name: 'Sneaker 3', price: 90, image: '/images/3.png' },
  { id: 4, name: 'Sneaker 4', price: 90, image: '/images/4.png' },
  { id: 5, name: 'Sneaker 5', price: 90, image: '/images/5.png' },
  { id: 6, name: 'Sneaker 6', price: 90, image: '/images/6.png' },
  { id: 7, name: 'Sneaker 7', price: 90, image: '/images/7.png' },
  { id: 8, name: 'Sneaker 8', price: 90, image: '/images/8.png' },
  { id: 9, name: 'Sneaker 9', price: 90, image: '/images/9.png' },
  { id: 10, name: 'Sneaker 10', price: 90, image: '/images/10.png' },

];

const ShopContainer = styled.div`
  padding: 2rem;
`;

const Shop = () => {
  return (
    <ShopContainer>
      <h2>All Products</h2>
      <ProductList products={products} />
    </ShopContainer>
  );
};

export default Shop;
