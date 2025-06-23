import React, { useContext, useState } from 'react'
import "./Navbar.css"
import { useNavigate } from 'react-router-dom'
import { CartSideBar } from '../CartSideBar/CartSideBar'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaSignOutAlt } from 'react-icons/fa'; // Using react-icons
import { ContextAPI } from '../../Context/ContextAPI'

export const Navbar = () => {
  const {logout,cartItems} = useContext(ContextAPI)
    const navigate = useNavigate()
     const [isCartOpen, setCartOpen] = useState(false);
 const [cartItem, setCartItem] = useState([]);

  const getData = async () => {
    const token = localStorage.getItem("Token");
    if (!token) return;

    try {
      const res = await axios.get("https://oceanbasket.onrender.com/api/customer/cart", {
        headers: { token },
      });

      if (res.data.success) {
        setCartItem(res.data.cart);
      }
    } catch (error) {
      toast.error(error.response?.data || error.message)
      console.error("Failed to fetch cart:", error.response?.data || error.message);
    }
  };
const handleLogout = () => {
logout()
  toast.success("Logged out successfully");
  navigate("/"); 
};

  const handleOpenCart = () => {
    getData();
    setCartOpen(true);
  };
  return (
    <>
    <div>
 <header className="header">
  <a onClick={()=>navigate("/")} className="logo">Ocean Basket</a>

  <div className="searchContainer">
   
    <input type="text" className="searchInput" placeholder="Search products..." />
     <i className="fas fa-search search-icon"></i>
  </div>

  <div className="navbarIcons">
    <button className="icon-button" aria-label="Profile">
      <a><i className="fas fa-user"></i></a>
    </button>
    <a onClick={handleOpenCart}>
      <button className="icon-button" aria-label="Shopping Cart" >
        <i className="fas fa-shopping-cart" ></i>
        <span className="cart-count">{cartItems ? cartItems.length : "0"}</span>
      </button>
    </a>
<button className="icon-button logout-button" onClick={handleLogout} aria-label="Logout">
  <FaSignOutAlt />
</button>

  </div>
</header>



    </div>
    <CartSideBar  isOpen={isCartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItem}/>
    </>
  )
}
