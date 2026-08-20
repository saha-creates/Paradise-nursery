import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "./CartSlice";

const plants = [
  // Indoor Plants
  {
    id: 1,
    name: "Snake Plant",
    price: 25,
    category: "Indoor Plants",
    image:
      "https://images.unsplash.com/photo-1593482892290-f54927ae2bb4?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Peace Lily",
    price: 30,
    category: "Indoor Plants",
    image:
      "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Spider Plant",
    price: 20,
    category: "Indoor Plants",
    image:
      "https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    name: "Monstera",
    price: 35,
    category: "Indoor Plants",
    image:
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 5,
    name: "ZZ Plant",
    price: 28,
    category: "Indoor Plants",
    image:
      "https://images.unsplash.com/photo-1632207691144-07e86b6e5a7a?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 6,
    name: "Rubber Plant",
    price: 32,
    category: "Indoor Plants",
    image:
      "https://images.unsplash.com/photo-1604762524889-3e2fcc145683?auto=format&fit=crop&w=400&q=80",
  },

  // Flowering Plants
  {
    id: 7,
    name: "Rose Plant",
    price: 22,
    category: "Flowering Plants",
    image:
      "https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 8,
    name: "Orchid",
    price: 40,
    category: "Flowering Plants",
    image:
      "https://images.unsplash.com/photo-1566907225472-514a1c5c5b8e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 9,
    name: "Hibiscus",
    price: 24,
    category: "Flowering Plants",
    image:
      "https://images.unsplash.com/photo-1597848212624-e19a5f1b4f7f?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 10,
    name: "Jasmine",
    price: 18,
    category: "Flowering Plants",
    image:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 11,
    name: "Lavender",
    price: 27,
    category: "Flowering Plants",
    image:
      "https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 12,
    name: "Marigold",
    price: 15,
    category: "Flowering Plants",
    image:
      "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=400&q=80",
  },

  // Succulents
  {
    id: 13,
    name: "Aloe Vera",
    price: 16,
    category: "Succulents",
    image:
      "https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 14,
    name: "Echeveria",
    price: 14,
    category: "Succulents",
    image:
      "https://images.unsplash.com/photo-1515657335277-8e5e2c5c9b0f?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 15,
    name: "Jade Plant",
    price: 19,
    category: "Succulents",
    image:
      "https://images.unsplash.com/photo-1597055181300-3d0a1b6f1e5f?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 16,
    name: "Haworthia",
    price: 17,
    category: "Succulents",
    image:
      "https://images.unsplash.com/photo-1596547609652-9cf5d8d4f4b7?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 17,
    name: "Burro's Tail",
    price: 21,
    category: "Succulents",
    image:
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 18,
    name: "Zebra Haworthia",
    price: 18,
    category: "Succulents",
    image:
      "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=400&q=80",
  },
];

function ProductList() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const categories = [...new Set(plants.map((plant) => plant.category))];

  const handleAddToCart = (plant) => {
    dispatch(addToCart(plant));
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">🌱 Paradise Nursery</Link>
        </div>

        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/plants">Plants</Link>
          <Link to="/cart">
            🛒 Cart ({cartCount})
          </Link>
        </div>
      </nav>

      {/* Product Listing */}
      <main className="product-list">
        <h1>Our Plants</h1>

        {categories.map((category) => {
          const categoryPlants = plants.filter(
            (plant) => plant.category === category
          );

          return (
            <section key={category} className="plant-category">
              <h2>{category}</h2>

              <div className="plant-grid">
                {categoryPlants.map((plant) => {
                  const isAdded = cartItems.some(
                    (item) => item.id === plant.id
                  );

                  return (
                    <div className="plant-card" key={plant.id}>
                      <img
                        src={plant.image}
                        alt={plant.name}
                        className="plant-image"
                      />

                      <h3>{plant.name}</h3>

                      <p className="plant-price">
                        ${plant.price.toFixed(2)}
                      </p>

                      <button
                        onClick={() => handleAddToCart(plant)}
                        disabled={isAdded}
                        className="add-to-cart"
                      >
                        {isAdded ? "Added to Cart" : "Add to Cart"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}

export default ProductList;
