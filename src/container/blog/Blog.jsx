// import React from "react";
import Article from "../../components/article/Article";
import "./blog.css";
import ayush from "../../assets/ayush.png"
import anjli from "../../assets/anjli.png"
import pratigna from "../../assets/pratigna.png"
import pratik from "../../assets/pratik.jpg"

const Blog = () => (
  <div className="npay__blog section__padding" id="blog">
    <div className="npay__blog-heading">
      <h1 className="gradient__text">
        Meet Our Founders <br /> and Learn About Their Contributions
      </h1>
    </div>
    <div className="npay__blog-container">
      <div className="npay__blog-container_groupA">
        <Article
          imgUrl={pratik}
          name="Pratik Thakur"
          text="Pratik Thakur is the leader of 'Nexpay.' He spearheaded the system design, database schema creation and implementation, API development, and integration of the net banking payment mode. His expertise ensures that our platform is robust, secure, and user-friendly."
        />
      </div>
      <div className="npay__blog-container_groupB">
        <Article
          imgUrl={ayush}
          name="Ovilash Jalui"
          text="Ovilash jalui played a pivotal role in Nexpay by leading the system design, database schema creation and implementation, and the development of the landing page. his technical skills and creative vision have been crucial to the project's success."
        />
        <Article
          imgUrl={ayush}
          name="Aayush Singh"
          text="Aayush singh led the system design  of e-commerce and the development of the eCommerce website. His work ensures a seamless user experience and robust architecture for our online platform."
        />
        <Article
          imgUrl={pratigna}
          name="Pratigna Hirani"
          text="Pratigna is responsible for the design and development of the landing page. His expertise in UX/UI design ensures an engaging and intuitive interface for our users."
        />
        <Article
          imgUrl={anjli}
          name="Anjali Daftari"
          text="Anjali Daftari played a key role in the eCommerce implementation, focusing on creating a seamless and efficient online shopping experience."
        />
      </div>
    </div>
  </div>
);

export default Blog;
