import React, { useContext } from 'react'
import "./CartSideBar.css"
import { ContextAPI } from '../../Context/ContextAPI';
import { useNavigate } from 'react-router-dom';
export const CartSideBar = ({ isOpen, cartItems, onClose }) => {
    const navigate = useNavigate()
    const { fishes } = useContext(ContextAPI);
 if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={onClose}></div>
      <div className="cart-sidebar">
        <div className="cart-header">
          <span>There are {cartItems.length} items in your cart.</span>
          <button className="cart-close" onClick={onClose}>×</button>
        </div>

 <div className="cart-items">
          {cartItems.map((item, idx) => {
            const fish = fishes.find(f => f.id.toString() === item.productId.toString()); // Match using ID

            return (
              <div className="cart-item" key={idx}>
                <img src={fish.image} alt={fish?.name} />
                <div className="cart-item-details">
                  <p>{fish?.name}</p>
                  <p>Price: ₹{item.price}</p>
                  <p>Qty: {item.quantity} Kg</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="cart-footer">
          <p>Subtotal: ₹{cartItems.reduce((sum, item) => sum + item.price, 0)}</p>
          <button className="btn-cart" onClick={()=>navigate("/cart")}>My Cart</button>
          <button className="btn-checkout" onClick={()=>navigate("/cart")}>Checkout</button>
        </div>
      </div>
    </>
  );
}
