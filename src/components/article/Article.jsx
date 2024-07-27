/* eslint-disable react/prop-types */
// import React from "react";
import "./article.css";

const Article = ({ imgUrl, name, text }) => (
  <div className="npay__blog-container_article">
    <div className="npay__blog-container_article-image">
      <img src={imgUrl} alt="blog_image" />
    </div>
    <div className="npay__blog-container_article-content">
      <div>
        <p>{name}</p>
        <h3>{text}</h3>
        
      </div>
      
    </div>
  </div>
);

export default Article;
