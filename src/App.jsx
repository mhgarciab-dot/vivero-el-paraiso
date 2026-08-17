import React, { useState } from 'react';
import AboutUs from './AboutUs';
import ProductList from './ProductList';
import './App.css';

function App() {
  const [showProducts, setShowProducts] = useState(false);

  const handleGetStarted = () => {
    setShowProducts(true);
  };

  return (
    <div className="app-container">
      {!showProducts ? (
        <main className="landing-page">
          <div className="landing-content">
            <h1>Paradise Nursery</h1>
            <AboutUs />
            <button 
              className="get-started-btn" 
              onClick={handleGetStarted}
              aria-label="Comenzar a comprar plantas"
            >
              Get Started
            </button>
          </div>
        </main>
      ) : (
        <ProductList onNavigateLanding={() => setShowProducts(false)} />
      )}
    </div>
  );
}

export default App;