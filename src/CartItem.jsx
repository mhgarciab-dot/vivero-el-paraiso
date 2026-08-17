import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const parseCost = (costString) => {
    return parseFloat(costString.replace('$', '')) || 0;
  };

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + parseCost(item.cost) * item.quantity, 0).toFixed(2);
  };

  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (itemName) => {
    dispatch(removeItem(itemName));
  };

  const handleCheckoutShopping = () => {
    alert("Coming Soon");
  };

  return (
    <main className="cart-container">
      <h2>Shopping Cart</h2>
      <h3>Total Plants: {calculateTotalQuantity()}</h3>
      <h3>Total Cost: ${calculateTotalAmount()}</h3>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item, index) => (
          <article key={index} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-img" />
            <div style={{ flex: 1, marginLeft: '20px' }}>
              <h4>{item.name}</h4>
              <p>Unit Price: {item.cost}</p>
              <p>Subtotal: ${(parseCost(item.cost) * item.quantity).toFixed(2)}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => handleDecrement(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)}>+</button>
              <button 
                onClick={() => handleRemove(item.name)}
                style={{ backgroundColor: '#e53935', color: '#fff', border: 'none', padding: '5px 10px' }}
              >
                Delete
              </button>
            </div>
          </article>
        ))
      )}

      <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
        <button className="action-btn" onClick={onContinueShopping}>
          Continue Shopping
        </button>
        <button className="action-btn" onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    </main>
  );
};

export default CartItem;