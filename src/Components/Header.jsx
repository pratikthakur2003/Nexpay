// import React from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';
// import Navigation from './Navigation';

// const HeaderContainer = styled.header`
//   background: #232f3e;
//   color: #fff;
//   padding: 1rem 2rem;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const Nav = styled.nav`
//   ul {
//     list-style: none;
//     display: flex;
//     gap: 1rem;
//   }
  
//   a {
//     color: #fff;
//     text-decoration: none;
//     &:hover {
//       text-decoration: underline;
//     }
//   }
// `;

// const Logo = styled.h1`
//   font-size: 1.5rem;
// `;

// const Header = () => {
//   return (
//     <HeaderContainer>
//       <Logo><Link to="/">Footwear Store</Link></Logo>
//       <Nav>
//         <ul>
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/shop">Shop</Link></li>
//           <li><Link to="/cart">Cart</Link></li>
//           <li><Link to="/profile">Profile</Link></li>
//         </ul>
//       </Nav>
//       <Navigation />
//     </HeaderContainer>
//   );
// };

// export default Header;
  

import { Badge } from "@mui/material";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  display: flex;
  align-items: center;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Header = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Logo>Footfolio</Logo>
          </Link>
        </Center>
        <Right>
        <MenuItem>
            <Link to="/shop" style={{ textDecoration: "none", color: "inherit" }}>
              Shop
            </Link>
          </MenuItem>
          {/* <MenuItem>REGISTER</MenuItem> */}
          <MenuItem>
            <Link to="/cart"style={{ textDecoration: "none", color: "inherit" }}> Cart
              <ShoppingCartOutlined style={{ marginRight: "5px" }} />
            </Link>
          </MenuItem>

          <MenuItem>
            <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
              Profile
            </Link>
          </MenuItem>

          {/* <MenuItem>
            <Link to="/contact" style={{ textDecoration: "none", color: "inherit" }}>
              Contact
            </Link>
          </MenuItem> */}
         
          <MenuItem>
            {/* <Badge badgeContent={4} color="primary">
              <ShoppingCartOutlined />
            </Badge> */}
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Header;
