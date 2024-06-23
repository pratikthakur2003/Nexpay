import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const ProductDetailContainer = styled.div`
  padding: 2rem;
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 500px;
  object-fit: cover;
`;

const SelectSize = styled.select`
  padding: 0.5rem;
  margin-top: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  gap: 1rem; /* Add gap between buttons */
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  cursor: pointer;
  border: none;
  outline: none;
  background-color: #333;
  color: #fff;
`;

const BuyNowButton = styled(Button)`
  background-color: #f44336;
`;

const CartButton = styled(Button)`
  background-color: #3f51b5;
`;

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState('');
  // Here you would normally fetch product data using the id
  const products = [
    {
      id: 1,
      name: 'Sneaker 1',
      price: 100,
      description: 'A great sneaker for everyday use. Comfortable and stylish.',
      image: '/images/1.png',
      sizes: ['6', '7', '8', '9', '10']
    },
    {
      id: 2,
      name: 'Sneaker 2',
      price: 120,
      description: 'The perfect sneaker for running. Lightweight and breathable.',
      image: '/images/2.png',
      sizes: ['6', '7', '8', '9', '10']
    },
    {
      id: 3,
      name: 'Sneaker 3',
      price: 90,
      description: 'Casual sneaker with a trendy design. Ideal for everyday wear.',
      image: '/images/3.png',
      sizes: ['6', '7', '8', '9', '10']
    },
    {
      id: 4,
      name: 'Sneaker 4',
      price: 110,
      description: 'Stylish and comfortable sneaker for any occasion.',
      image: '/images/4.png',
      sizes: ['6', '7', '8', '9', '10']
    },
    {
      id: 5,
      name: 'Sneaker 5',
      price: 95,
      description: 'Classic sneaker design with a modern twist. Versatile and durable.',
      image: '/images/5.png',
      sizes: ['6', '7', '8', '9', '10']
    },
    {
      id: 6,
      name: 'Sneaker 6',
      price: 130,
      description: 'Sleek and sophisticated sneaker. Perfect for formal occasions.',
      image: '/images/6.png',
      sizes: ['6', '7', '8', '9', '10']
    },
    {
      id: 7,
      name: 'Sneaker 7',
      price: 85,
      description: 'Affordable and stylish sneaker for everyday wear.',
      image: '/images/7.png',
      sizes: ['6', '7', '8', '9', '10']
    },
    {
      id: 8,
      name: 'Sneaker 8',
      price: 105,
      description: 'Durable and comfortable sneaker. Suitable for outdoor activities.',
      image: '/images/8.png',
      sizes: ['6', '7', '8', '9', '10']
    },
    {
      id: 9,
      name: 'Sneaker 9',
      price: 115,
      description: 'Fashionable and trendy sneaker. Adds a stylish touch to any outfit.',
      image: '/images/9.png',
      sizes: ['6', '7', '8', '9', '10']
    },
    {
      id: 10,
      name: 'Sneaker 10',
      price: 140,
      description: 'Premium quality sneaker with superior comfort and durability.',
      image: '/images/10.png',
      sizes: ['6', '7', '8', '9', '10']
    },
    // Add data for other sneakers
  ];

  const product = products.find(product => product.id === parseInt(id));

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleAddToCart = () => {
    // Add logic to add the product to the cart
    console.log('Product added to cart:', product);
  };

  const handleBuyNow = () => {
    // Add logic to navigate to checkout page or payment page
    console.log('Buying now:', product);
  };

  return (
    <ProductDetailContainer>
      <ProductImage src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>Price: Rs{product.price}</p>
      <p>{product.description}</p>
      <SelectSize onChange={handleSizeChange}>
        <option value="">Select Size</option>
        {product.sizes.map(size => (
          <option key={size} value={size}>{size}</option>
        ))}
      </SelectSize>
      <ButtonContainer>
        <Button onClick={handleAddToCart}>Add to Cart</Button>
        <BuyNowButton onClick={handleBuyNow}>Buy Now</BuyNowButton>
        <CartButton onClick={handleAddToCart}>Add to Cart</CartButton>
      </ButtonContainer>
    </ProductDetailContainer>
  );
};

export default ProductDetail;
