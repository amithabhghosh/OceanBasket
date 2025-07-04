import React from 'react'
import { useContext, useEffect, useState } from 'react';
import "./Cart.css";
import { ContextAPI } from '../../Context/ContextAPI';
import axios from 'axios';
import { toast } from 'react-toastify';
import API from '../../connectApi';
export const Cart = () => {
   


  const { fishes } = useContext(ContextAPI);
  const [cartItems, setCartItems] = useState([]);

  const token = localStorage.getItem("Token");

  const fetchCart = async () => {
    const res = await API.get("/customer/cart", {
      headers: { token }
    });
    if (res.data.success) setCartItems(res.data.cart);
  };

  useEffect(() => {
    fetchCart();
  }, []);

const updateQuantity = async (productId, newQty,price) => {
  
  if (newQty < 0.5 || newQty > 10) return;
  newQty = parseFloat(newQty.toFixed(1)); 

  try {
    await API.put("/customer/cart", {
      productId,
      quantity: newQty,
      price
    }, {
      headers: { token }
    });


    setCartItems((prev) =>
      prev.map((item) =>
      item.productId === productId ? { ...item, quantity: newQty, price: price * newQty * 2 } : item
      )
    );
  } catch (err) {
    console.error("Quantity update failed", err);
  }
};

const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const deliveryCharge = 100;
const total = subtotal + deliveryCharge;






  const getFishData = (id) => fishes.find((f) => f.id.toString() === id.toString());

  const deleteCartItem = async (id) => {
  try {
    await API.delete(`/customer/cart/${id}`, {
      headers: { token }
    });

    setCartItems((prev) => prev.filter(item => item._id !== id));
    toast.success("Item removed from cart");
  } catch (error) {
    toast.error("Failed to delete item");
    console.error("Delete error:", error);
  }
};

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Your Fish Cart</h2>


      {cartItems.length === 0 ? (
    <div className="empty-cart">
      <h3>Your cart is empty 🛒</h3>
    </div>
  ) :(
    <>
    
      <div className="cart-table-wrapper">
        <table className="cart-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Subtotal</th>
              <th>Del</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, idx) => {
              const fish = getFishData(item.productId);
              return (
                <tr key={idx}>
                  <td>
                    <img className="cart-img" src={fish.image} alt={fish?.name} />
                  </td>
                  <td>{fish?.name}</td>
                  <td>₹{fish.price}</td>
             <td>
  <div className="qty-buttons">
    <button
      className="qty-btn"
      onClick={() => updateQuantity(item.productId, item.quantity - 0.5,fish.price)}
      disabled={item.quantity <= 0.5}
    >-</button>

    <div className="qty-display">{item.quantity.toFixed(1)}</div>

    <button
      className="qty-btn"
      onClick={() => updateQuantity(item.productId, item.quantity + 0.5,fish.price)}
      disabled={item.quantity >= 10}
    >+</button>
  </div>
</td>


                  <td>₹{(fish.price * item.quantity * 2).toFixed(2)}</td>

                  <td>
  <button className="del-btn" onClick={() => deleteCartItem(item._id)}>🗑️</button>
</td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {cartItems.length > 0 && (
  <div className="cart-summary">
    <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
    <p>Delivery Charges: ₹{deliveryCharge}</p>
    <h3>Total: ₹{total.toFixed(2)}</h3>
    <button className="checkout-btn">Proceed to Checkout</button>
  </div>
)}
    </>
  )}
 </div>
  );
};

export default Cart;


