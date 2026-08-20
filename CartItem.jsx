import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "./CartSlice";

function CartItem() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    alert("Checkout Coming Soon!");
  };

  return (
    <div className="cart-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">🌱 Paradise Nursery</Link>
        </div>

        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/plants">Plants</Link>
          <Link to="/cart">
            🛒 Cart ({totalItems})
          </Link>
        </div>
      </nav>

      {/* Shopping Cart */}
      <main className="cart-container">
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>

            <Link to="/plants" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="cart-items">
              {cartItems.map((item) => {
                const itemTotal = item.price * item.quantity;

                return (
                  <div className="cart-item" key={item.id}>
                    {/* Plant Thumbnail */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-image"
                    />

                    {/* Plant Information */}
                    <div className="cart-item-details">
                      <h2>{item.name}</h2>

                      <p>
                        Unit Price: ${item.price.toFixed(2)}
                      </p>

                      <p>
                        Total: ${itemTotal.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="quantity-controls">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        disabled={item.quantity === 1}
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => dispatch(increaseQuantity(item.id))}
                      >
                        +
                      </button>
                    </div>

                    {/* Delete Button */}
                    <button
                      className="delete-button"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Cart Summary */}
            <div className="cart-summary">
              <h2>Cart Summary</h2>

              <p>
                Total Items: <strong>{totalItems}</strong>
              </p>

              <p className="cart-total">
                Total Amount: <strong>${totalAmount.toFixed(2)}</strong>
              </p>

              <div className="cart-actions">
                <Link to="/plants" className="continue-shopping">
                  Continue Shopping
                </Link>

                <button
                  className="checkout-button"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default CartItem;
