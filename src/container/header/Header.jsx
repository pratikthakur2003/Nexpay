// import React from "react";
import "./header.css";
import headerimg from "../../assets/header_img.svg"


const Header = () => {
  return (
    <div className="npay__header section__padding" id="home">
      <div className="npay__header-content">
        <h1 className="gradient__text">
          Let&apos;s Innovate Payments Together With Nexpay 
        </h1>

        <p>NexPay provides an extensive API for those looking to develop their own payment gateways. Our project aims to offer comprehensive resources and code examples to simplify the integration and development process for new payment solutions.</p>


        <div className="npay__header-content__input">
          <button type="button" className='npay__header-content__buttonA'>Send money</button>        
          <button type="button" className='npay__header-content__buttonB'>Get Started</button>
        </div>

        
      </div>

      <div className="npay__header-image">
        <img src={headerimg} alt="AI" />
      </div>
    </div>
  );
};

export default Header;
