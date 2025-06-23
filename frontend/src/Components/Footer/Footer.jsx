import React from 'react'
import "./Footer.css"
export const Footer = () => {
  return (
    <footer className="footer">
  <div className="footer-container">
    <div className="footer-section brand">
      <h3>OCEAN BASKET</h3>
      <p>Your one-stop destination for all your shopping needs.</p>
      <div className="social-icons">
        <i className="fab fa-facebook-f"></i>
        <i className="fab fa-twitter"></i>
        <i className="fab fa-instagram"></i>
        <i className="fab fa-pinterest-p"></i>
      </div>
    </div>

    <div className="footer-section">
      <h4>Shop</h4>
      <ul>
        <li>New Arrivals</li>
        <li>Best Sellers</li>
        <li>Deals & Offers</li>
        <li>Gift Cards</li>
        <li>Membership</li>
      </ul>
    </div>

    <div className="footer-section">
      <h4>Help</h4>
      <ul>
        <li>Contact Us</li>
        <li>FAQs</li>
        <li>Shipping</li>
        <li>Returns</li>
        <li>Track Order</li>
      </ul>
    </div>

    <div className="footer-section">
      <h4>About</h4>
      <ul>
        <li>Our Story</li>
        <li>Careers</li>
        <li>Press</li>
        <li>Blog</li>
        <li>Sustainability</li>
      </ul>
    </div>

    <div className="footer-section newsletter">
      <h4>Newsletter</h4>
      <p>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
      <div className="newsletter-input">
        <input type="email" placeholder="Your email" />
        <button>Subscribe</button>
      </div>
    </div>
  </div>

  <div className="footer-bottom">
    <hr />
    <p>© 2025 Ocean Basket. All rights reserved.</p>
  </div>
</footer>

  )
}
