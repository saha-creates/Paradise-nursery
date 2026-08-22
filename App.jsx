import React, { useState } from "react";
import "./App.css";
import ProductList from "./ProductList";

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStarted = () => {
    setShowProductList(true);
  };

  return (
    <div>
      {!showProductList ? (
        <div className="landing-page">
          <div className="landing-content">
            <h1>Paradise Nursery</h1>

            <p>
              Bring nature into your home with our beautiful collection of
              indoor and outdoor plants.
            </p>

            <button onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
        </div>
      ) : (
        <ProductList />
      )}
    </div>
  );
}

export default App;
