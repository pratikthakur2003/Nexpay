// import React from "react";
import Feature from "../../components/feature/Feature";
import "./whatnpay.css";

const Whatnpay = () => {
  return (
    <div className="npay__whatnpay section__margin" id="wnpay">
      <div className="npay__whatnpay-feature">
        <Feature
          title="What is Nexpay?"
          text="NexPay is an innovative payment gateway designed to revolutionize transactions with seamless integration and robust security. By providing merchants with unique API keys, NexPay ensures personalized and secure payment processing. Dive into a world where financial transactions are effortless and efficient, unlocking endless possibilities for businesses to grow and thrive."
        />
      </div>
      <div className="npay__whatnpay-heading">
        <h1 className="gradient__text">
        NexPay opens doors to limitless opportunities.
        </h1>
        <p>Explore The Library</p>
      </div>
      <div className="npay__whatnpay-container">
        <Feature
          title="Real-time Data Flow"
          text="Experience the power of real-time data flow with NexPay. Instantly track transactions, monitor trends, and gain valuable insights into your business operations."
        />
        <Feature
          title="Knowledgebase"
          text="NexPay offers an extensive knowledge base, providing users with a wealth of information at their fingertips. From detailed guides to troubleshooting tips, our knowledge base is designed to help you navigate and maximize the benefits of NexPay."
        />
        <Feature
          title="Education"
          text="NexPay is committed to educating its users on the best practices and latest trends in payment processing. Through webinars, tutorials, and in-depth articles, we provide the knowledge you need to stay ahead."
        />
      </div>
    </div>
  );
};

export default Whatnpay;
