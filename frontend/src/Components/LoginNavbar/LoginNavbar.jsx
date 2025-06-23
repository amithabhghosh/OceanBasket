import React, { useState } from 'react'
import "./LoginNavbar.css"
import LoginSignupModal from '../LoginSignUpModel/LoginSignupModal';
export const LoginNavbar = () => {
      const [isModalOpen, setIsModalOpen] = useState(false);
  return (
 <div>
  <header className="nav-container">
    <a onClick={() => navigate("/")} className="nav-logo">Ocean Basket</a>

    <div className="nav-search-box">
      <input
        type="text"
        className="nav-search-input"
        placeholder="Search products..."
      />
      <i className="fas fa-search nav-search-icon"></i>
    </div>

    <div className="nav-auth-buttons">
      <button className="nav-login-btn" onClick={() => setIsModalOpen(true)}>Login</button>
      <button className="nav-signup-btn" onClick={() => setIsModalOpen(true)}>Signup</button>
    </div>
  </header>
   <LoginSignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
</div>


  )
}
