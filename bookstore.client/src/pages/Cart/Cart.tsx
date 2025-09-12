import React from 'react';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart: React.FC = () => {
  const { state, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  if (state.items.length === 0) {
    return (
      <div className="cart">
        <div className="container">
          <h1>Shopping Cart</h1>
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button onClick={() => navigate('/books')} className="continue-shopping">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleCheckout = () => {
    alert('Checkout functionality would be implemented here!');
    clearCart();
  };

  return (
    <div className="cart">
      <div className="container">
        <h1>Shopping Cart</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            {state.items.map((item) => (
              <div key={item.book.id} className="cart-item">
                <img src={item.book.imageUrl} alt={item.book.title} className="cart-item-image" />
                
                <div className="cart-item-details">
                  <h3>{item.book.title}</h3>
                  <p>by {item.book.author}</p>
                  <p className="item-price">${item.book.price}</p>
                </div>
                
                <div className="cart-item-controls">
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                      className="quantity-button"
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                      className="quantity-button"
                    >
                      +
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item.book.id)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="item-total">
                  ${(item.book.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-line">
              <span>Subtotal:</span>
              <span>${state.total.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="summary-line total">
              <span>Total:</span>
              <span>${state.total.toFixed(2)}</span>
            </div>
            
            <button onClick={handleCheckout} className="checkout-button">
              Proceed to Checkout
            </button>
            
            <button onClick={() => navigate('/books')} className="continue-shopping">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;