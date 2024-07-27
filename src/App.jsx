// import React from 'react';

import {
  Footer,
  Blog,
  Possibility,
  Features,
  Whatnpay,
  Header
} from "./container";
import { Navbar, Brand, CTA } from "./components";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <div className="Gradient__bg">
        <Navbar />
        <Header />
      </div>
      <Brand />
      <Whatnpay />
      <Features />
      <Possibility />
      <CTA />
      <Blog />
      <Footer />
    </div>
  );
};

export default App;
