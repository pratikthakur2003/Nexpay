import React, { useState } from 'react';
import './possibility.css';
import { FaCreditCard, FaShieldAlt, FaLink, FaMoneyCheckAlt } from 'react-icons/fa';
import img1 from '../../assets/service1_img.png';
import img2 from '../../assets/service2_img.png';
import img4 from '../../assets/service4_img.png';

const serviceImages = [img1, img2, img4, img2];
const serviceData = [
  {
    title: 'PAYMENT METHODS',
    description: 'We support a wide variety of payment methods including credit/debit cards, net banking, and mobile wallets.',
    icon: <FaCreditCard /> // Replace with your preferred icon
  },
  {
    title: 'SAFE & SECURE',
    description: 'We prioritize the safety of your data with advanced security features, including tokenization and secure storage.',
    icon: <FaShieldAlt /> // Replace with your preferred icon
  },
  {
    title: 'Bank API Integration',
    description: 'Integrate with various banks and manage transactions seamlessly with our API solutions.',
    icon: <FaLink /> // Replace with your preferred icon
  },
  {
    title: 'Process Payment',
    description: 'Master the process of handling secure transactions with our detailed guides and examples.',
    icon: <FaMoneyCheckAlt /> // Replace with your preferred icon
  },
];

const Service = () => {
  const [currentImage, setCurrentImage] = useState(serviceImages[0]);
  const [selectedTab, setSelectedTab] = useState(0); // To keep track of the selected service

  const handleTabClick = (index) => {
    setCurrentImage(serviceImages[index]);
    setSelectedTab(index);
  };

  return (
    <div className="service-container section__padding" id='feature'>
      <h1 className="service-heading gradient__text">Multiple Features We Offer</h1>
      <div className="service-content">
        <div className="service-image-section">
          <div className="service-image-card">
            <img src={currentImage} alt="Service" className="service-image" />
          </div>
        </div>
        <div className="vertical-scroll-bar">
          {serviceData.map((service, index) => (
            <div
              key={index}
              className={`scroll-indicator ${selectedTab === index ? 'active' : ''}`}
              onClick={() => handleTabClick(index)}
            />
          ))}
        </div>
        <div className="service-list-section">
          {serviceData.map((service, index) => (
            <div
              key={index}
              className={`service-card ${selectedTab === index ? 'selected' : ''}`}
              onClick={() => handleTabClick(index)}
            >
              <div className="service-icon">{service.icon}</div>
              <div className="service-info">
                <h2>{service.title}</h2>
                <p>{service.description} </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
