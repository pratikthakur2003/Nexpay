import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./Header"
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Checkout from './Checkout';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        
        <Routes>
          <Route path="/"  element={<Home />}/>
          <Route path="checkout" element={<Checkout />}/>
          <Route path="signup" element={<Signup />}/>
          <Route path="login"  element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
