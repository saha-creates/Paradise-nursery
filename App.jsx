import React from "react";
import "./App.css";

function App() {
  const handleGetStarted = () => {
    alert("Welcome to Paradise Nursery!");
  };

  return (
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
  );
}

export default App;
