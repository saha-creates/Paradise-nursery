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

  // Calculate the total cost for an individual plant
  const calculateItemTotal = (item) => {
    return item.price * item.quantity;
  };

  // Calculate the total number of items in the cart
  const calculateTotalItems = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  };

  // Calculate the total cost of the entire cart
  const calculateCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + calculateItemTotal(item),
      0
    );
  };

  // Increase plant quantity
  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  // Decrease plant quantity
  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  // Remove plant from cart
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  // Checkout functionality
  const handleCheckout = () => {
    alert("Checkout Coming Soon!");
  };

  const totalItems = calculateTotalItems();
  const totalAmount = calculateCartTotal();

  return (
    <div className="cart-page">

      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">
            🌱 Paradise Nursery
          </Link>
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

            <Link
              to="/plants"
              className="continue-shopping"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="cart-items">

              {cartItems.map((item) => (
                <div
                  className="cart-item"
                  key={item.id}
                >

                  {/* Plant Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />

                  {/* Plant Details */}
                  <div className="cart-item-details">
                    <h2>{item.name}</h2>

                    <p>
                      Unit Price: $
                      {item.price.toFixed(2)}
                    </p>

                    <p>
                      Quantity: {item.quantity}
                    </p>

                    <p className="item-total">
                      Total: $
                      {calculateItemTotal(item).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="quantity-controls">

                    <button
                      onClick={() =>
                        handleDecrease(item.id)
                      }
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        handleIncrease(item.id)
                      }
                    >
                      +
                    </button>

                  </div>

                  {/* Delete Button */}
                  <button
                    className="delete-button"
                    onClick={() =>
                      handleRemove(item.id)
                    }
                  >
                    Delete
                  </button>

                </div>
              ))}

            </div>

            {/* Cart Summary */}
            <div className="cart-summary">

              <h2>Cart Summary</h2>

              <p>
                Total Items:
                <strong> {totalItems}</strong>
              </p>

              <p className="cart-total">
                Total Amount:
                <strong>
                  ${totalAmount.toFixed(2)}
                </strong>
              </p>

              {/* Cart Actions */}
              <div className="cart-actions">

                <Link
                  to="/plants"
                  className="continue-shopping"
                >
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
