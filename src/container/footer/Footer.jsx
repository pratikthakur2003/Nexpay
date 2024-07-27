// import React from "react";
import logo from "../../assets/logo.png";
import "./footer.css";

const Footer = () => (
  <div className="npay__footer section__padding">
    <div className="npay__footer-heading">
      <h1 className="gradient__text">
        Do you want to step in to the future before others
      </h1>
    </div>

    <div className="npay__footer-btn">
      <p>Request Early Access</p>
    </div>

    <div className="npay__footer-links">
      <div className="npay__footer-links_logo">
        <div className="npay__footer-links_logoA">
           <img src={logo} alt="npay_logo" />
           <h3>Nexpay</h3>
        </div>
        <p>
          Crechterwoord K12 182 DK Alknjkcb, <br /> All Rights Reserved
        </p>
      </div>
      <div className="npay__footer-links_div">
        <h4>Links</h4>
        <p>Overons</p>
        <p>Social Media</p>
        <p>Counters</p>
        <p>Contact</p>
      </div>
      <div className="npay__footer-links_div">
        <h4>Company</h4>
        <p>Terms & Conditions </p>
        <p>Privacy Policy</p>
        <p>Contact</p>
      </div>
      <div className="npay__footer-links_div">
        <h4>Get in touch</h4>
        <p>Crechterwoord K12 182 DK Alknjkcb</p>
        <p>085-132567</p>
        <p>info@payme.net</p>
      </div>
    </div>

    <div className="npay__footer-copyright">
      <p>@2024 Nexpay. All rights reserved.</p>
    </div>
  </div>
);

export default Footer;
