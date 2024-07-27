import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assets/logo.png';
import './navbar.css';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="npay__navbar">
      <div className="npay__navbar-links">
        <div className="npay__navbar-links_logo">
          <img src={logo} />
          <h2>Nexpay</h2>
        </div>
        <div className="npay__navbar-links_container">
          <p><a href="#home">Home</a></p>
          <p><a href="#wnpay">What is Nexpay?</a></p>
          <p><a href="#feature">Features</a></p>
          <p><a href="#service">Services</a></p>
          <p><a href="#blog">Founders</a></p>
        </div>
      </div>
      
      <div className="npay__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className="npay__navbar-menu_container scale-up-center">
          <div className="npay__navbar-menu_container-links">
            <p><a href="#home">Home</a></p>
            <p><a href="#wnpay">What is Nexpay?</a></p>
            <p><a href="#feature">Features</a></p>
            <p><a href="#service">Services</a></p>
            <p><a href="#blog">Founders</a></p>
          </div>
          
        </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
