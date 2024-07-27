// import React from "react";
import Feature from "../../components/feature/Feature";
import "./features.css";

const featuresData = [
  {
    title: "Secure and Reliable Transactions",
    text: "Nexpay ensures that every transaction is secure and reliable, giving you peace of mind while managing your finances. Experience the highest standards of security and reliability with us."
  },
  {
    title: "Effortless Payment Processing",
    text: "Say goodbye to complex payment processes. With Nexpay, enjoy seamless and hassle-free payment experiences, making it easier than ever to handle your transactions."
  },
  {
    title: "Innovative Solutions for Your Business",
    text: "Nexpay provides cutting-edge solutions to meet your business needs. Our platform is designed to support growth and innovation, helping you stay ahead in the competitive market."
  },
  {
    title: "User-Friendly Interface",
    text: "Our intuitive and easy-to-use interface ensures that anyone can navigate through the system effortlessly. Whether you're a business owner or a consumer, Nexpay makes payments simple."
  }
];

const Features = () => (
  <div className="npay__features section__padding" id="service">
    <div className="npay__features-heading">
      <h1 className="gradient__text">
        The Future of Payments is Here. Embrace the Change with Nexpay.
      </h1>
      <p>Request Early Access to Get Started</p>
    </div>
    <div className="npay__features-container">
      {featuresData.map((item, index) => (
        <Feature title={item.title} text={item.text} key={item.title + index} />
      ))}
    </div>
  </div>
);

export default Features;
