import React from 'react'
import "./Footer.css"
import { useNavigate } from 'react-router-dom'
export const Footer = () => {
  const navigate = useNavigate()
  return (
     <footer className="footer">
      <div className="footerContent">
        <div className="footerLogo">
          {/* <img src="/logo.png" alt="Company Logo" /> */}
          <p>My Ocean Basket</p>
        </div>

        <div className="footerAddress">
          <h4>Contact Us</h4>
          <p>123 Ocean Street</p>
          <p>Kochi, Kerala - 682001</p>
          <p>Email: contact@myoceanbasket.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>

        <div className="footerSocials">
          <h4>Follow Us</h4>
          <div className="socialIcons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <ion-icon name="logo-facebook"></ion-icon>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <ion-icon name="logo-instagram"></ion-icon>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <ion-icon name="logo-twitter"></ion-icon>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
          </div>
        </div>
      </div>

<div className="footerPrivacyandOtherDetail">
<p onClick={()=>navigate("/privacy-policy")}>Privacy-policy</p>
<p onClick={()=>navigate("/terms-and-condition")}>Terms and Condition</p>
</div>

      <div className="footerBottom">
        
        <p>© 2025 My Ocean Basket. All rights reserved.</p>
      </div>
    </footer>
  )
}
