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

  // Calculate total price of one cart item
  const getItemTotal = (price, quantity) => {
    return price * quantity;
  };

  // Calculate total number of products in cart
  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);
  };

  // Calculate total cart amount
  const getTotalCartAmount = () => {
    return cartItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
  };

  // Increase quantity
  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  // Decrease quantity
  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  // Delete item
  const handleDelete = (id) => {
    dispatch(removeFromCart(id));
  };

  // Checkout
  const handleCheckout = () => {
    alert("Coming Soon!");
  };

  const totalItems = getTotalItems();
  const totalCartAmount = getTotalCartAmount();

  return (
    <div className="cart-page">

      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">Paradise Nursery</Link>
        </div>

        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/plants">Plants</Link>
          <Link to="/cart">
            Cart ({totalItems})
          </Link>
        </div>
      </nav>

      {/* Cart Page */}
      <div className="cart-container">

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

          <div>

            {/* Individual Cart Items */}
            {cartItems.map((item) => (

              <div
                className="cart-item"
                key={item.id}
              >

                {/* Thumbnail */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />

                {/* Name and Prices */}
                <div className="cart-item-details">

                  <h2>{item.name}</h2>

                  <p>
                    Unit Price: ${item.price.toFixed(2)}
                  </p>

                  <p>
                    Quantity: {item.quantity}
                  </p>

                  <p>
                    Item Total: $
                    {getItemTotal(
                      item.price,
                      item.quantity
                    ).toFixed(2)}
                  </p>

                </div>

                {/* Quantity Controls */}
                <div className="quantity-controls">

                  <button
                    onClick={() =>
                      handleDecrease(item.id)
                    }
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      handleIncrease(item.id)
                    }
                  >
                    +
                  </button>

                </div>

                {/* Delete */}
                <button
                  className="delete-button"
                  onClick={() =>
                    handleDelete(item.id)
                  }
                >
                  Delete
                </button>

              </div>
            ))}

            {/* Cart Total */}
            <div className="cart-summary">

              <h2>Cart Summary</h2>

              <p>
                Total Items: {totalItems}
              </p>

              <h3>
                Total Cart Amount: $
                {totalCartAmount.toFixed(2)}
              </h3>

              {/* Buttons */}
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

          </div>
        )}

      </div>
    </div>
  );
}

export default CartItem;
