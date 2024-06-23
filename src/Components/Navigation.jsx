import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavToggle = styled.div`
  display: none;
  cursor: pointer;
  font-size: 1.5rem;
  @media (max-width: 768px) {
    display: block;
  }
`;

const NavContainer = styled.nav`
  ul {
    list-style: none;
    display: flex;
    gap: 1rem;
    @media (max-width: 768px) {
      flex-direction: column;
      display: ${({ open }) => (open ? 'block' : 'none')};
      position: absolute;
      background: #232f3e;
      width: 100%;
      left: 0;
      top: 60px;
    }
  }
  
  a {
    color: #fff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Navigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <NavToggle onClick={() => setOpen(!open)}>☰</NavToggle>
      <NavContainer open={open}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </NavContainer>
    </>
  );
};

export default Navigation;
